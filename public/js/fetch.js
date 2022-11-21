const googleKey = process.env.GOOGLE_KEY

fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}&projection=lite&key=${googleKey}`)
  .then(response => response.json())
  .then(result => {
console.log(result) })
