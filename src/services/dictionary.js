class Dictionary {
  
  async getWordInfo(word) {
    await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  }
}
const dictionary = new Dictionary();
export default dictionary;