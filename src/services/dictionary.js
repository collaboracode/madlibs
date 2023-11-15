class Dictionary {
  /**
   * @param {string} str
   */
  filterOutBlacklistedWords(str) {
    // Purpose is to use this function as a regex validator and send one word at a time
    // blacklisted words will not be sent to getWordInfo()
    const blacklist = /\ba\b|\Wan(?=[.,\W])|\Wand(?=[.,\W])|\Wthe|\Wit(?=[.,\W])|\Wso(?=[.,\W])|is(?=[.,\W])|\Wbe(?=[.,\W])|\Wto(?=[.,\W])|\Wtoo(?=[.,\W])|\Wam(?=[.,\W])|/ig;
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