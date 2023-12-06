class Dictionary {
  /**
   * @param {string} str
   */
  filterOutBlacklistedWords(str) {
    // Purpose is to use this function as a regex validator and send one word at a time
    // blacklisted words will not be sent to getWordInfo()
    // (?:\b)a\b|(?:\b)an(?=[.,\W])|(?:\b)and(?=[.,\W])|(?:\b)the|(?:\b)it(?=[.,\W])|(?:\b)so(?=[.,\W])|(?:\b)is(?=[.,\W])|(?:\b)be(?=[.,\W])|(?:\b)to(?=[.,\W])|(?:\b)too(?=[.,\W])|(?:\b)am(?=[.,\W])|(?:\b)see(?=[.,\W])|
    const blacklist = /(?:\b)a\b|(?:\b)an(?=[.,\W])|(?:\b)and(?=[.,\W])|(?:\b)the(?=[.,\W])|(?:\b)it(?=[.,\W])|(?:\b)so(?=[.,\W])|(?:\b)is(?=[.,\W])|(?:\b)be(?=[.,\W])|(?:\b)to(?=[.,\W])|(?:\b)too(?=[.,\W])|(?:\b)am(?=[.,\W])|(?:\b)see(?=[.,\W])|(?:\b)on(?=[.,\W])|(?:\b)at(?=[.,\W])|(?:\b)or(?=[.,\W])|(?:\b)as(?=[.,\W])|(?:\b)in(?=[.,\W])|(?:\b)of(?=[.,\W])|(?:\b)if(?=[.,\W])|(?:\b)into(?=[.,\W])/ig;
    return str.replaceAll(blacklist, "");
  }

  /**
   * @param {string} word
   * @param {AbortController.signal | undefined} signal
   * @returns {{word: string, meanings?: string[]}} // todo make type for this.
   */
  async getWordInfo(word, signal) {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, { signal });
    const formattedRes = res.json();
    return formattedRes;
  }

  /**
 * @param {string} story
 * @returns {string[]}
 */
  getWordArray(story) {
    // split apart the string by words and every symbol and put into array
    const seg = new Intl.Segmenter("en", { granularity: 'word' })
    return [...seg.segment(story)].map(x => x.segment)
  }

  /**
   * @param {number} numWords 
   * @param {string} story
   * @returns {{word: string, meanings?: string[]}} still need to work on filling out the structure
   */
  async findWords(numWords, story) {
    if (!story) return []
    const quoteArray = this.getWordArray(story)
    const wordsToReplace = []
    while (numWords > 0) {
      // create a random number between 0 and story length
      const randomInt = Math.floor(Math.random() * (quoteArray.length - 1));

      // get word from array with randomInt
      const randomWord = quoteArray[randomInt]

      // check if word is bad for madlibs
      const blacklistConditionals = [
        "", " ", ".", ",", "'", '"', "?", "/", "!",":", "a", "an", "and", "i", "the",
        "it", "so", "am", "is", "be", "to", "too", "am", "see", "on", "at", "or",
        "as", "in", "of", "their", "every", "your", "my", "his", "her", "our", "as",
        "if", "into", "for", "was", "from", "by", ")", "(", "[", ";", "was"
      ]
      if (!blacklistConditionals.includes(randomWord) && randomWord.length > 2) {

        // todo add edge case resolution to find another word on failure
        /* Example NOT FOUND object
        {
            "title": "No Definitions Found",
            "message": "Sorry pal, we couldn't find definitions for the word you were looking for.",
            "resolution": "You can try the search again at later time or head to the web instead."
        }
        */

        // api call to see what type of word
        const randomWordLowerCase = randomWord.toLowerCase()
        const wordInfo = await this.getWordInfo(randomWordLowerCase)

        // if title property exists, then we've received a no definition found result from the api, don't do anything with this word
        if (!wordInfo.hasOwnProperty("title")) {

          // keep track of index to be able to replace word with partOfSpeach insert
          wordInfo[0].index = randomInt
          wordsToReplace.push(wordInfo[0])
          numWords = numWords - 1
        }
      }
    }
    return wordsToReplace
  }
}
const dictionary = new Dictionary();
export default dictionary;