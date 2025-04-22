const API_KEY = '45380d0ea7c359398f703c772b7ab058'; // Looks like: 45380d0we7c... (not the Bearer token)

fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=Inception`)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

function getPopularMovies() {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      const movies = data.results;
      const featuredContainer = document.getElementById('featured-movies');
      featuredContainer.innerHTML = ''; // clear in case it reruns

      movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');

        card.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
          <h3>${movie.title}</h3>
        `;

        featuredContainer.appendChild(card);
      });
    })
    .catch(err => console.error('Failed to fetch popular movies:', err));
}

getPopularMovies();