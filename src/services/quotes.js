class Quotes {

  async getQuote() {
    const res = await fetch("https://shortstories-api.onrender.com/", {
      // mode: 'no-cors', 
      headers: {
        "Content-Type": "application/json",
      }
    })
    const finalRes = await res.json();
    return finalRes.story;
  }



}

const quotes = new Quotes();
export default quotes;