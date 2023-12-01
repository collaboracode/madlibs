import quotes from '../services/quotes';

/**
 * @param {{word: string, meanings?: string[]}} props 
 */
export default function ShowStory(props) {
  const { wordArr, newWords } = props

  /**@type {string} */
  // let str = 
  let arr = [quotes.story]
  let index = 0

  while (index < wordArr.length) {
    const currentWord = wordArr[index].word
    const regex = new RegExp("\\b" + currentWord + "\\b", 'gi')
    let skip = false
    for (let i = 0; i < arr.length; i++) {
      if (typeof arr[i] !== "string") continue

      const location = arr[i].search(regex)
      if (location === -1) continue

      skip = true
      arr = [
        ...arr.slice(0, i),
        arr[i].substring(0, location),
        <b>{newWords[index]?.length > 0 ? newWords[index] : wordArr[index].word}</b>,
        arr[i].substring(location + currentWord.length),
        ...arr.slice(i + 1)
      ]
    }
    if (!skip) {
      index++
    }
  }

  // todo return an element and make the replacements bold.
  return (
    <p>
      {...arr}
    </p>
  )
}