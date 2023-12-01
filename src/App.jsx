import './App.css'
import { useState, useEffect } from 'react'

import quotes from './services/quotes';
import ShowStory from './components/showStory';
import dictionary from './services/dictionary';
import WordForm from './components/wordForm';

function App() {
  const [story, setStory] = useState("");
  const [wordArr, setWordArr] = useState([]);
  const [newWords, setNewWords] = useState([])

  useEffect(() => {
    // handles double requests in useEffect.
    const controller = new AbortController();
    const signal = controller.signal;

    quotes.getNewStory(signal)
      .then(() => {
        setStory(quotes.story)
        return quotes.story
      })
      .then(story => {
        dictionary.findWords(4, story).then((words) => {
          setWordArr(words)
        })
      })
      .catch(err => {
        if (String(err) == "AbortError: The user aborted a request.") {
          return
        }
        else {
          console.error(err)
        }
      })
    return () => {
      controller.abort()
    }
  }, []);

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Madlibs!!!</h1>
      {wordArr.length > 0 && <WordForm wordArr={wordArr} newWords={newWords} setNewWords={setNewWords} />}
      {wordArr.length > 0 && <ShowStory wordArr={wordArr} newWords={newWords} />}
    </>
  )
}


export default App;