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
    const filteredQ = dictionary.filterOutBlacklistedWords(q)
    setQuote(filteredQ)
    console.log("before: ", q);
    console.log("after: ", filteredQ);

    setWordCount(q.split(' ').length);
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
    </>
  )
}

export default App;