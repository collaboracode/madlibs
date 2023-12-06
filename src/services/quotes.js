class Quotes {
  constructor() {
    this.story = ""
    this.title = ""
  }

  /**
   * @param {AbortController.signal | undefined} signal
   * @returns {Promise<string>}
   */
  async getNewStory(signal) {
    const res = await fetch("https://shortstories-api.onrender.com/", {
      // mode: 'no-cors', 
      headers: {
        "Content-Type": "application/json",
      },
      signal
    })
    const finalRes = await res.json();
    this.story = finalRes.story
    this.title = finalRes.title
    return finalRes.story;
  }

}
const quotes = new Quotes();
export default quotes;