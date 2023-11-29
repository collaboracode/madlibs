import './App.css'
import { useState, useEffect } from 'react'

import quotes from './services/quotes'
import dictionary from './services/dictionary';

function App() {
  const [quote, setQuote] = useState("");
  const [wordArr, setWordArr] = useState([]);
  const [wordCount, setWordCount] = useState(0);

  async function doStuff() {
    const story = await quotes.getQuote()
    const words = await findWords(4, story). //can be easily set by user if we want to do that later

    setWordArr(words)
    setQuote(story)
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
      <p>{getStoryArrayWithReplacedWords(quote, wordArr).join("")}</p>
    </>
  )
}

/**
 * 
 * @param {string} story 
 * @param {{word: string, meanings?: string[], index: number}} words 
 */
function getStoryArrayWithReplacedWords(story, words) {
  const quoteArray = getWordArray(story)
  // replace words for partOfSpeech
  words.forEach(word => {
    quoteArray[word.index] = `[_${word.meanings?.[0].partOfSpeech}_]`
  });
  return quoteArray
}

/**
 * @param {string} story
 * @returns {string[]}
 */
function getWordArray(story) {
  // split apart the string by words and every symbol and put into array
  const seg = new Intl.Segmenter("en", { granularity: 'word' })
  return [...seg.segment(story)].map(x => x.segment)
}

/**
 * @param {number} numWords 
 * @param {string} story
 * @returns {{word: string, meanings?: string[]}} still need to work on filling out the structure
 */
async function findWords(numWords, story) {
  const quoteArray = getWordArray(story)
  console.log(quoteArray);
  const allWords = []
  while (numWords > 0) {
    // create a random number between 0 and story length
    const randomInt = Math.floor(Math.random() * (quoteArray.length - 1));
    console.log("random int", randomInt);

    // get word from array with randomInt
    const randomWord = quoteArray[randomInt]
    console.log("random word", randomWord);

    // check if word is bad for madlibs
    const blacklistConditionals = ["", " ", ".", ",", "'", '"', "?", "/", "!", "a", "an", "and", "i", "the", "it", "so", "am", "is", "be", "to", "too", "am", "see", "on", "at", "or", "as", "in", "of", "their", "every"]
    if (!blacklistConditionals.includes(randomWord)) {

      // todo add edge case resolution to find another word on failure
      /* Example NOT FOUND object
      {
          "title": "No Definitions Found",
          "message": "Sorry pal, we couldn't find definitions for the word you were looking for.",
          "resolution": "You can try the search again at later time or head to the web instead."
      }
      */
      // api call to see what type of word
      const randomWordLowerCase = randomWord.toLowerCase()
      const wordInfo = await dictionary.getWordInfo(randomWordLowerCase)
      // if title property exists, then we've received a no definition found result from the api, don't do anything with this word
      if (!wordInfo.hasOwnProperty("title")) {

        // keep track of index to be able to replace word with partOfSpeach insert
        wordInfo[0].index = randomInt
        allWords.push(wordInfo[0])
        // { word: wordInfo[0].word, index: randomInt}
        numWords = numWords - 1

        console.log("word info", wordInfo);
        console.log("all words", allWords);
      }
    }
  }
  // replace words for partOfSpeech
  // allWords.forEach(word => {
  //   quoteArray[word.index] = `[_${word[0].meanings[0].partOfSpeech}_]`
  // });

  // could use join() to display from quoteArray in render() so we could dierctly manipulate quoteArray as the user answers the questions
  // const newStory = quoteArray.join("")
  //console.log("newStory", newStory);
  console.log('allwords', allWords)
  return allWords //[...allWords.map(word => { return word[0].word })]
}

// iterate through the array of words, and forEach()
// "story".replaceAll("word" /* the word from the array */, true /* has input set? */ ? "_part_of_speech_n_" : "the input")

export default App;