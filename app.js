const API_KEY = '45380d0ea7c359398f703c772b7ab058'; // Looks like: 45380d0we7c... (not the Bearer token)
let allPopularMovies = [];

fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Inception`)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

  function getPopularMovies() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        allPopularMovies = data.results;
        renderMovies(allPopularMovies);  
      })
      .catch(err => console.error('Failed to fetch popular movies:', err));
  }

  function renderMovies(movies) {
    const featuredContainer = document.getElementById('featured-movies');
    featuredContainer.innerHTML = '';
  
    movies.slice(0, 8).forEach(movie => {
      const card = document.createElement('div');
      card.classList.add('movie-card');
      card.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        <h3>${movie.title}</h3>
        <h4>${Math.floor(movie.vote_average)} / 10 <i class="fa-solid fa-star"></i></h4>
      `;
      featuredContainer.appendChild(card);
    });
  }

getPopularMovies();

function searchMovies(query) {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      renderMovies(data.results); // this handles rendering
    })
    .catch(err => console.error('Search failed:', err));
}

const searchInput = document.getElementById('search-input');

searchInput.addEventListener('keyup', (e) => {
  const query = e.target.value.trim();
  if (query.length > 2) {
    searchMovies(query);
  } else {
    getPopularMovies(); // reset to popular if search is cleared or too short
  }
});

document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const rating = button.getAttribute('data-rating');

    if (rating === 'all') {
      renderMovies(allPopularMovies);
    } else {
      const filtered = allPopularMovies.filter(movie => movie.vote_average >= parseFloat(rating));
      renderMovies(filtered);
    }
  });
});

const ratingSlider = document.getElementById('rating-range');
const ratingDisplay = document.getElementById('rating-value');
const noResultsMsg = document.getElementById('no-results-message');

ratingSlider.addEventListener('input', () => {
  const selectedRating = parseFloat(ratingSlider.value);
  ratingDisplay.textContent = selectedRating === 0 ? 'All' : `${selectedRating}`;

  let filteredMovies = allPopularMovies;

  if (selectedRating > 0) {
    filteredMovies = allPopularMovies.filter(movie => Math.floor(movie.vote_average) === selectedRating);
  }

  if (filteredMovies.length === 0) {
    noResultsMsg.classList.remove('hidden');
  } else {
    noResultsMsg.classList.add('hidden');
  }

  renderMovies(filteredMovies);
});