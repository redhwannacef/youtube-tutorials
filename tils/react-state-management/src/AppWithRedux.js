import React, { useState } from 'react';
import './App.css';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { connect, Provider } from 'react-redux';

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

const {
  actions: { like, dislike },
  reducer,
} = createSlice({
  name: 'movies',
  initialState: movieList,
  reducers: {
    like: (state, action) => {
      state[action.payload].likes += 1;
    },
    dislike: (state, action) => {
      state[action.payload].likes -= 1;
    },
  },
});

const store = configureStore({ reducer });

const mapStateMovie = (state, props) => ({ movie: state[props.id] });
const mapStateNav = (state) => ({
  topMovieName: state.reduce((max, current) => (current.likes > max.likes ? current : max), state[0]).name,
  totalLikes: state.reduce((accumulator, movie) => accumulator + movie.likes, 0),
});

const mapDispatch = { like, dislike };

const App = () => (
  <Provider store={store}>
    <Nav />
    <Body />
  </Provider>
);

const Nav = connect(mapStateNav)(({ topMovieName, totalLikes }) => (
  <div className="nav">
    <TopMovie topMovieName={topMovieName} />
    <TotalLikes totalLikes={totalLikes} />
  </div>
));

const TopMovie = ({ topMovieName }) => <div>{topMovieName}</div>;

const TotalLikes = ({ totalLikes }) => <div>Total Likes: {totalLikes}</div>;

const Body = () => (
  <div className="body">
    <Movies />
  </div>
);

const Movies = () => {
  const [movieIds] = useState(movieList.map((movie) => movie.id));

  return (
    <div>
      <h2>Movies</h2>
      <div className="movie-list">
        {movieIds.map((id) => (
          <Movie key={id} id={id} />
        ))}
      </div>
    </div>
  );
};

const Movie = connect(
  mapStateMovie,
  mapDispatch
)(({ movie, like, dislike }) => (
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
));

export default App;
