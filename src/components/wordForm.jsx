import { useEffect, useState } from "react"
import quotes from '../services/quotes';

export default function WordForm(props) {
  const { wordArr, newWords, setNewWords } = props
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
  return (
    <form>
      {newWords && newWords.map((word, i) => {
        return (
          <input key={i} type="text" onChange={handleChange} placeholder={wordArr[i].meanings[0].partOfSpeech} data-index={i} value={word} />
        )
      })}
    </form>
  )
}