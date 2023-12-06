import './App.css'
import { useState, useEffect } from 'react'

import quotes from './services/quotes';
import ShowStory from './components/showStory';
import dictionary from './services/dictionary';
import WordForm from './components/wordForm';

function App() {
  const [storyTitle, setStoryTitle] = useState("");
  const [wordArr, setWordArr] = useState([]);
  const [newWords, setNewWords] = useState([])
  const [displayStory, setDisplayStory] = useState(false)
  const [loading, setLoading] = useState(true)

  const newStory = async (signal) => {
    setLoading(true)
    setDisplayStory(false)
    quotes.getNewStory(signal)
      .then(() => quotes.story)
      .then(story => {
        dictionary.findWords(8, story).then((words) => {
          setLoading(false)
          setStoryTitle(quotes.title)
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
  }

  useEffect(() => {
    // handles double requests in useEffect.
    const controller = new AbortController();
    const signal = controller.signal;
    newStory(signal).then(() => {

    })

    return () => {
      controller.abort()
    }
  }, []);

  const newStoryButton = () => <button disabled={loading} onClick={() => {
    newStory()
  }
  }>New Story</button>

  return (
    <div className='container'>
      <h1 style={{ textAlign: 'center' }}>Madlibs!!!</h1>
    
      <h2 style={{ textAlign: 'center' }}>{storyTitle}</h2>
      {wordArr.length > 0 && <WordForm
        wordArr={wordArr}
        newWords={newWords}
        setNewWords={setNewWords}
        setDisplayStory={setDisplayStory}
        loading={loading}
        displayStory={displayStory}
        ButtonFromParent={newStoryButton}
      />}
      <article>
        {displayStory && wordArr.length > 0 && <ShowStory wordArr={wordArr} newWords={newWords} />}
        {loading ? <h2>Loading...</h2> : null}
      </article>
    </div>
  )
}


export default App;