import { useEffect, useState } from "react";
import { ReactComponent as Octocat } from "./octocat.svg";
import "./App.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const fetchGists = async () => {
  const response = await fetch(
    'https://api.github.com/users/redhwannacef/gists'
  );
  if (!response.ok) {
    throw Error("something went wrong!");
  }
  return response.json();
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Gists />
  </QueryClientProvider>
)

const Gists = () => {
  const { status, data: gists } = useQuery('gistsData', () => fetchGists());

  if(status === 'loading') return 'loading...';
  if(status === 'error') return 'error';

  return (
    <main>
      <Octocat />
      <h1>Gists</h1>
      {gists.map((gist) => (
        <a key={gist.id} href={gist.html_url}>
          <p>{gist.description || "No Description"}</p>
        </a>
      ))}
    </main>
  );
};

export default App;
