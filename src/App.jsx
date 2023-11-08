import './App.css'
import { useState, useEffect } from 'react'

import quotes from './services/quotes'

function App() {
  const [quote, setQuote] = useState("")
  async function doStuff() {
    const q = await quotes.getQuote()
    setQuote(q)
    console.log(q);

  }
  useEffect(() => {
    doStuff()
  }, [])
  return (
    <>
      <h1>Madlibs!!!</h1>
      <p>quote {quote}</p>
    </>
  )
}

export default App
