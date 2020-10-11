import React, { memo, useCallback, useState } from 'react';
import { atom, RecoilRoot, selector, useRecoilState, useRecoilValue } from 'recoil';
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

const moviesState = atom({
  key: `moviesList`,
  default: movieList,
});

const topMovieNameState = selector({
  key: 'topMovieName',
  get: ({ get }) =>
    get(moviesState).reduce((max, current) => (current.likes > max.likes ? current : max), get(moviesState)[0]).name,
});

const totalLikesState = selector({
  key: 'totalLikes',
  get: ({ get }) => get(moviesState).reduce((accumulator, movie) => accumulator + movie.likes, 0),
});

const App = () => (
  <RecoilRoot>
    <Nav />
    <Body />
  </RecoilRoot>
);

const Nav = () => {
  const topMovieName = useRecoilValue(topMovieNameState);
  const totalLikes = useRecoilValue(totalLikesState);

  return (
    <div className="nav">
      <TopMovie topMovieName={topMovieName} />
      <TotalLikes totalLikes={totalLikes} />
    </div>
  );
};

const TopMovie = ({ topMovieName }) => <div>{topMovieName}</div>;

const TotalLikes = ({ totalLikes }) => <div>Total Likes: {totalLikes}</div>;

const Body = () => (
  <div className="body">
    <Movies />
  </div>
);

const Movies = () => {
  const [movieIds] = useState(movieList.map((movie) => movie.id));
  const [movies, setMovies] = useRecoilState(moviesState);

  const updateLikes = (id, value) => {
    setMovies((movies) => {
      const index = movies.findIndex((movie) => movie.id === id);
      const movie = movies[index];
      return [...movies.slice(0, index), { ...movie, likes: movie.likes + value }, ...movies.slice(index + 1)];
    });
  };

  const like = useCallback((id) => updateLikes(id, 1), []);
  const dislike = useCallback((id) => updateLikes(id, -1), []);

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
const Movie = memo(({ movie, like, dislike }) => {
  console.log('rendering', movie.id);
  return (
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
});

export default App;
