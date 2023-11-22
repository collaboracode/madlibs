import './App.css'
import { useState, useEffect } from 'react'

import quotes from './services/quotes'
import dictionary from './services/dictionary';

function App() {
  const [quote, setQuote] = useState("");
  const [wordArr, setWordArr] = useState([]);
  const [wordCount, setWordCount] = useState(0);

  async function doStuff() {
    // const q = await quotes.getQuote()

    // //split apart the string by words and every symbol and put into array
    // const seg = new Intl.Segmenter("en", { granularity: 'word' })
    // const quoteArray = [...seg.segment(q)].map(x => x.segment)
    // console.log(quoteArray);

    
    const thing = await findWords(4) //can be easily set by user if we want to do that later
    console.log("thing: ",thing)
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


async function findWords(numWords) {
  const q = await quotes.getQuote()

  //split apart the string by words and every symbol and put into array
  const seg = new Intl.Segmenter("en", { granularity: 'word' })
  const quoteArray = [...seg.segment(q)].map(x => x.segment)
  console.log(quoteArray);
  const allWords = []
  while (numWords > 0) {
    //create a random number between 0 and story length
    const randomInt = Math.floor(Math.random() * (quoteArray.length)); 
    console.log("random int", randomInt);

    //get word from array with randomInt
    const randomWord = quoteArray[randomInt]
    console.log("random word", randomWord);
    
    //check if word 
    const blacklistConditionals = ["", " ", ".", ",", "'", '"', "?", "/", "!", "a", "an", "and", "i", "the", "it", "so", "am", "is", "be", "to", "too", "am", "see", "on", "at", "or", "as", "in", "of"]
    if (!blacklistConditionals.includes(randomWord)) {

      //api call to see what type of word
      const randomWordLowerCase = randomWord.toLowerCase()
      const wordInfo = await dictionary.getWordInfo(randomWordLowerCase)

      //keep track of index to be able to replace word with partOfSpeach insert
      wordInfo.index = randomInt
      allWords.push(wordInfo)
      numWords = numWords - 1
      
      console.log("word info", wordInfo);
      console.log("all words", allWords);
    }
  }
  //replace words for partOfSpeech
  allWords.forEach(word => {
    quoteArray[word.index] = `[_${word[0].meanings[0].partOfSpeech}_]`
  });

  //could use join() to display from quoteArray in render() so we could dierctly manipulate quoteArray as the user answers the questions
  const newStory = quoteArray.join("")
  console.log("newStory", newStory);
  return {
    story: quoteArray.join(""),
    words: [...allWords.map(word => {return word[0].word})] 
  }
}

// iterate through the array of words, and forEach()
// "story".replaceAll("word" /* the word from the array */, true /* has input set? */ ? "_part_of_speech_n_" : "the input")

export default App;