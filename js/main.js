
const movieList = document.querySelector('#movie-list .row')
const genreList = document.querySelector('#genres-list .list-group')
let allMovieData = []
let genreHTML = ``
let allGenres = { 
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
}

axios.get('https://movie-list.alphacamp.io/api/v1/movies')
.then(response => {
  allMovieData = response.data.results
})
.catch(error => console.log(error))

// 左側印出電影類型列表
for (let genre in allGenres) {
  genreHTML += `
    <div class="list-group-item list-group-item-action" id="${genre}" data-toggle="list"role="tab" >${allGenres[genre]}</div>
  ` 
  genreList.innerHTML = genreHTML
}

// 右側印出電影資料(傳入的movieData要是一組陣列)
function printMovie(movieData) {
  let movieHTML = ``
  let genresHTML = ``
  const endingHTML = `
      </div>
    </div>
  `
  const posterURL = 'https://movie-list.alphacamp.io/posters/'
  if (movieData.length === 0) {
    movieHTML = `
      <div class="alert alert-danger" role="alert">
        不好意思，目前沒有此類別的電影!
      </div>
    `
    console.log(123)
  } else {
    movieData.forEach(eachMovie => {
    movieHTML += `
            <div class="col-3" id="nav-tabContent">
              <div class="img-size">
                <img class="card-img-top" src="${posterURL}${eachMovie.image}" alt="">
              </div>
              <h5>${eachMovie.title}</h5>
              <div>           
    `
    
    eachMovie.genres.forEach(genresNum => {  
      genresHTML += `
          <span class="p-1 rounded text-white bg-secondary">${allGenres[genresNum]}</span>
      `
    })
    movieHTML += genresHTML + endingHTML
    genresHTML = `` // 避免將電影的genres帶到下一個電影裡，進行清空動作
    })  
  }
  movieList.innerHTML = movieHTML
}

// 拿到監聽器獲取的genre，比對所有電影裡含有該genre的，篩選產出一組新的陣列
function movieFilter(genre) {
  let results = allMovieData.filter(eachMovie=> eachMovie.genres.includes(Number(genre)))
  printMovie(results)
}

// 監聽左邊每一個genre按鈕
/*
發現點下去後，有時候要再點一次才會跑出來，記得好像有個助教回應過我類似問題，
是因為axios不知道甚麼時候讀取完成，導致有時候點下去會有資料，有時候又會沒資料。
如果我為了確保每次點都一定會有資料出來，把這個監聽器放到前面axios.then裡面，這樣算是一種對的解法嗎?
*/
genreList.addEventListener('click', function(){ 
  movieFilter(event.target.id) 
})