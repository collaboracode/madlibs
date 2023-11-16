import './App.css'
import { useState, useEffect } from 'react'

import quotes from './services/quotes'
import dictionary from './services/dictionary';

function App() {
  const [quote, setQuote] = useState("");
  const [wordArr, setWordArr] = useState([]);
  const [wordCount, setWordCount] = useState(0);

  async function doStuff() {
    const q = await quotes.getQuote()
    //split apart the string by words and every symbol and put into array
    const seg = new Intl.Segmenter("en", { granularity: 'word' })
    const quoteArray = [...seg.segment(q)].map(x => x.segment)
    console.log(quoteArray);
    // const filteredQ = dictionary.filterOutBlacklistedWords(q)
    // setQuote(filteredQ)
    // console.log("before: ", q);
    // console.log("after: ", filteredQ);
    async function findWords(numWords) {
      const allWords = []
      while (numWords > 0) {
        //create a random number between 0 and story length
        const randomInt = Math.floor(Math.random() * (quoteArray.length)); 
        console.log("random int", randomInt);
        //get word from array with randomInt
        const randomWord = quoteArray[randomInt]
        console.log("random word", randomWord);
        //check if word 
        const blacklistConditionals = ["", " ", ".", ",", "'", '"', "?", "/", "!", "a", "an", "and", "the", "it", "so", "is", "be", "to", "too", "am", "see", "on", "at", "or", "as", "in", "of"]
        if (!blacklistConditionals.includes(randomWord)) {
        //api call to see what type of word
        const randomWordLowerCase = randomWord.toLowerCase()
        const wordInfo = await dictionary.getWordInfo(randomWordLowerCase)
        //keep track of index to be able to replace word with partOfSpeach insert
        wordInfo.index = randomInt
        allWords.push(wordInfo)
        console.log("word info", wordInfo);
        console.log("all words", allWords);
        numWords = numWords - 1
        }
      }

      allWords.forEach(word => {
        console.log("WORD", word[0].meanings);
        quoteArray[word.index] = `[_${word[0].meanings[0].partOfSpeech}_]`
      });
      const newStory = quoteArray.join("")
      console.log("newStory", newStory);
    }
    findWords(4)

    // const arr = q.split(' ');
    // setWordArr(arr);
    // setWordCount(arr.length);
  }

  useEffect(() => {
    doStuff();
  }, []);

  useEffect(() => {
    // Random number generator to get index pos of words to check with dictionary api
  }, [wordCount]);

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Madlibs!!!</h1>
      <p style={{ textAlign: 'center', lineHeight: '2rem' }}>{quote}</p>
      <p>Word Count: {wordCount}</p>
    </>
  )
}

export default App;