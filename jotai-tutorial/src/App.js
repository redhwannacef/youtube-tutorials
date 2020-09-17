import React, { useState } from "react";
import "./App.css";
import { atom, Provider, useAtom } from "jotai";

const usernameAtom = atom("Red");
const countAtom = atom((get) => get(usernameAtom).length);

const App = () => (
  <Provider>
    <Nav />
    <Body />
  </Provider>
);

const Nav = () => {
  const [username] = useAtom(usernameAtom);

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
  const [username, setUsername] = useAtom(usernameAtom);

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
  const count = useAtom(countAtom);
  return <p>Count: {count}</p>;
};

export default App;
