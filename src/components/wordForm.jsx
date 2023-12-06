import { useEffect, useState } from "react"
import quotes from '../services/quotes';

export default function WordForm(props) {
  const { wordArr, newWords, setNewWords, setDisplayStory, loading, displayStory, ButtonFromParent } = props
  // const [newWords, setNewWords] = useState([])

  useEffect(() => {
    setNewWords(wordArr.map(wordObj => ""))
  }, [])

  /**
   * 
   * @param {InputEvent} e 
   */
  const handleChange = (e) => {
    const temp = [...newWords]
    const index = Number(e.target.dataset.index)
    temp[index] = e.target.value
    setNewWords(temp)
  }

  /**
   * @param {SubmitEvent} e 
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    setDisplayStory(!displayStory)
  }

  return (
    <form onSubmit={handleSubmit} className="wordForm">
      <div className="inputDiv">

        {newWords && newWords.map((word, i) => {
          return (
            <input key={i} type="text" onChange={handleChange} placeholder={wordArr[i].meanings[0].partOfSpeech} data-index={i} value={word} />
          )
        })}
      </div>
      <div className="buttonDiv">
        <button disabled={loading} type="submit">{displayStory ? "Hide Story" : "Show Story"}</button>
        <ButtonFromParent /> {/* bad, ugly, should not do like this... but it works */}
      </div>
    </form>
  )
}