import React, { useState } from 'react';
import './App.css';

const movieList = [
  { id: 0, name: 'The Shawshank Redemption', likes: 0 },
  { id: 1, name: 'The Godfather', likes: 0 },
  { id: 2, name: 'The Godfather: Part II', likes: 0 },
  { id: 3, name: 'The Dark Knight', likes: 0 },
  { id: 4, name: '12 Angry Men', likes: 0 },
  { id: 5, name: "Schindler's List", likes: 0 },
  { id: 6, name: 'The Lord of the Rings: The Return of the King ', likes: 0 },
  { id: 7, name: 'Pulp Fiction', likes: 0 },
  { id: 8, name: 'The Good, the Bad and the Ugly', likes: 0 },
  { id: 9, name: 'The Lord of the Rings: The Fellowship of the Ring', likes: 0 },
];

const App = () => {
  const [movies, setMovies] = useState(movieList);

  const updateLikes = (id, value) => {
    setMovies((movies) => {
      const index = movies.findIndex((movie) => movie.id === id);
      const movie = movies[index];
      return [...movies.slice(0, index), { ...movie, likes: movie.likes + value }, ...movies.slice(index + 1)];
    });
  };

  const like = (id) => updateLikes(id, 1);
  const dislike = (id) => updateLikes(id, -1);

  return (
    <>
      <Nav movies={movies} />
      <Body movies={movies} like={like} dislike={dislike} />
    </>
  );
};

const Nav = ({ movies }) => {
  const topMovieName = movies.reduce((max, current) => (current.likes > max.likes ? current : max), movies[0]).name;
  const totalLikes = movies.reduce((accumulator, movie) => accumulator + movie.likes, 0);

  return (
    <div className="nav">
      <TopMovie topMovieName={topMovieName} />
      <TotalLikes totalLikes={totalLikes} />
    </div>
  );
};

const TopMovie = ({ topMovieName }) => <div>{topMovieName}</div>;

const TotalLikes = ({ totalLikes }) => <div>Total Likes: {totalLikes}</div>;

const Body = ({ movies, like, dislike }) => (
  <div className="body">
    <Movies movies={movies} like={like} dislike={dislike} />
  </div>
);

const Movies = ({ movies, like, dislike }) => {
  const [movieIds] = useState(movieList.map((movie) => movie.id));

  return (
    <div>
      <h2>Movies</h2>
      <div className="movie-list">
        {movieIds.map((id) => (
          <Movie key={id} movie={movies[id]} like={like} dislike={dislike} />
        ))}
      </div>
    </div>
  );
};

const Movie = ({ movie, like, dislike }) => (
  <div className="movie-item">
    <div>{movie.name}</div>
    <div>{movie.likes}</div>
    <div>
      <button onClick={() => like(movie.id)}>
        <span role="img" aria-label="like">
          👍🏼
        </span>
      </button>
      <button onClick={() => dislike(movie.id)}>
        <span role="img" aria-label="dislike">
          👎🏼
        </span>
      </button>
    </div>
  </div>
);

export default App;
