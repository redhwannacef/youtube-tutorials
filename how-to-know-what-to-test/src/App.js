import React, { useState } from "react";
import "./App.css";

async function fetchGists(username) {
  const response = await fetch(`https://api.github.com/users/${username}/gists`);
  if (!response.ok) {
    throw Error(response.message || "something went wrong!");
  }
  return response.json();
}

const App = () => {
  const [username, setUsername] = useState("");
  const [lastSearch, setLastSearch] = useState("");
  const [gists, setGists] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const onSubmit = async event => {
    event.preventDefault();
    setFetchError(null);
    if (!username || !username.trim()) {
      setSearchError("A search term is needed");
      return;
    } else {
      setSearchError(null);
    }

    setLastSearch(username.trim());

    try {
      const gists = await fetchGists(username.trim());
      setGists(gists);
    } catch (e) {
      setGists(null);
      setFetchError(e.message);
    }
  };

  return (
    <>
      <h1>Gist</h1>
      <form autoComplete="off" onSubmit={onSubmit}>
        <input
          aria-label="username-input"
          name="username"
          placeholder="username"
          onChange={event => setUsername(event.target.value)}
        />
        {searchError && <p>{searchError}</p>}
        <button>Search</button>
      </form>
      {fetchError && <p>Oops, something went wrong.</p>}
      {gists && <Gists username={lastSearch} gists={gists} />}
    </>
  );
};

const Gists = ({ username, gists }) => {
  return (
    <>
      <h2>Gists for {username}:</h2>
      {gists.length === 0 && <h3>No gists found.</h3>}
      {gists.map(gist => (
        <a key={gist.id} href={gist.html_url}>
          {gist.description || "No Description"}
        </a>
      ))}
    </>
  );
};

export default App;
