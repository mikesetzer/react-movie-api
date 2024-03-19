import React, {useState, useEffect} from 'react';
import axios from 'axios';

const MovieSearchPage = () => {
  const [searchText, setSearchText] = useState('');
  const [movieList, setMovieList] = useState([0]);

  const searchMovie = (e) => {
    e.preventDefault();
    const search = e.target.movieSearch.value;
    setSearchText(search);

    const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=en-US&page=1`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_MOVIE_API_KEY}`
    }
  };

    axios.request(options)
      .then(res => {
        setMovieList(res.data.results)
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <div>
      <h1>Movie search page</h1>
      <form onSubmit={searchMovie}>
        <input type="text" name="movieSearch" placeholder="search" />
        <button type="submit">Search</button>
      </form>
      <div id="moviesList">
        <ul>
          {movieList.map((movie) => {
            <li key={movie.id}>{movie.original_title}</li>
          })}
        </ul>
      </div>
    </div>
  )

}

export default MovieSearchPage;
