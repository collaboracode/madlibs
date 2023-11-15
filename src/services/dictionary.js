class Dictionary {
  /**
   * @param {string} str
   */
  filterOutBlacklistedWords(str) {
    // Purpose is to use this function as a regex validator and send one word at a time
    // blacklisted words will not be sent to getWordInfo()
    // (?:\b)a\b|(?:\b)an(?=[.,\W])|(?:\b)and(?=[.,\W])|(?:\b)the|(?:\b)it(?=[.,\W])|(?:\b)so(?=[.,\W])|(?:\b)is(?=[.,\W])|(?:\b)be(?=[.,\W])|(?:\b)to(?=[.,\W])|(?:\b)too(?=[.,\W])|(?:\b)am(?=[.,\W])|(?:\b)see(?=[.,\W])|
    const blacklist = /(?:\b)a\b|(?:\b)an(?=[.,\W])|(?:\b)and(?=[.,\W])|(?:\b)the(?=[.,\W])|(?:\b)it(?=[.,\W])|(?:\b)so(?=[.,\W])|(?:\b)is(?=[.,\W])|(?:\b)be(?=[.,\W])|(?:\b)to(?=[.,\W])|(?:\b)too(?=[.,\W])|(?:\b)am(?=[.,\W])|(?:\b)see(?=[.,\W])|(?:\b)on(?=[.,\W])|(?:\b)at(?=[.,\W])|(?:\b)or(?=[.,\W])|(?:\b)as(?=[.,\W])|(?:\b)in(?=[.,\W])|(?:\b)of(?=[.,\W])/ig;
    return str.replaceAll(blacklist, "");
  }
  async getWordInfo(word) {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const formattedRes = res.json();
    return formattedRes;
  }
}
const dictionary = new Dictionary();
export default dictionary;