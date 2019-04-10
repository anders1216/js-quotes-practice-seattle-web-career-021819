// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.

const BASE_URL = `http://localhost:3000/quotes`

// const quoteContainer = document.getElementById('quote-container')
const quoteList = document.getElementById('quote-list')
const quoteForm = document.getElementById('new-quote-form')
const submitBtn = document.getElementById('submitBtn')

submitBtn.addEventListener('click', (ev) => {
  ev.preventDefault;

  let quoteInput = document.getElementById('new-quote')
  let authorInput = document.getElementById('author')

  let quote = quoteInput.value
  let author = authorInput.value

  createQuote(BASE_URL, quote, author)
})

function createQuote(url, quote, author){
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({quote: quote, likes: 0, author: author})
  }).then(res => res.json()).then(json => renderQuotes(json))
}

function fetchQuotes(url){
  fetch(url)
  .then(res => res.json())
  .then(json => renderQuotes(json))
}



function renderQuotes(data){
  while(quoteList.firstChild){
    quoteList.firstChild.remove()
  }
  data.forEach(data => {
    console.log(data)
    let li = document.createElement('li')
    let blockquote = document.createElement('blockquote')
    let p = document.createElement('p')
    let footer = document.createElement('footer')
    let likeBtn = document.createElement('button')
    let deleteBtn = document.createElement('button')
    let likeSpan = document.createElement('span')

    p.textContent = data.quote
    footer.textContent = data.author
    likeBtn.textContent = "Likes "
    likeSpan.textContent = data.likes

    likeBtn.addEventListener('click', () => {
      likeButtonFunction()
    })

    deleteBtn.textContent = "Delete"

    blockquote.appendChild(p)
    blockquote.appendChild(footer)
    likeBtn.appendChild(likeSpan)
    blockquote.appendChild(likeBtn)
    blockquote.appendChild(deleteBtn)

    li.appendChild(blockquote)

    quoteList.appendChild(li)
  })
}

function likeButtonFunction(data){
  console.log(data.likes)
}

fetchQuotes(BASE_URL)
