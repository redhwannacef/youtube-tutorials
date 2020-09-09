import React, { useState } from "react";
import "./App.css";
import create from "zustand";

const useStore = create((set, get) => ({
  username: "Red",
  setUsername: (username) => set({ username }),
  count: () => get().username.length,
}));

const App = () => (
  <>
    <Nav />
    <Body />
  </>
);

const Nav = () => {
  const username = useStore((state) => state.username);

  return (
    <nav>
      <p>{username}</p>
    </nav>
  );
};

const Body = () => (
  <div className="container">
    <Profile />
    <Count />
  </div>
);

const Profile = () => {
  const { username, setUsername } = useStore();

  return (
    <>
      <h2>Profile:</h2>
      <p>{username}</p>
      <input
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
    </>
  );
};

const Count = () => {
  const count = useStore(state => state.count());
  return <p>Count: {count}</p>;
};

export default App;
