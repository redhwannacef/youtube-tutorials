import { ReactComponent as Octocat } from "./octocat.svg";
import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "react-query";
import * as mockApi from "./mockApi";

mockApi.start();

const fetchGist = async () => {
  const response = await fetch(
    "https://api.github.com/users/redhwannacef/gists"
  );
  if (!response.ok) {
    throw Error("something went wrong!");
  }
  return response.json();
};

const postGists = async (gist) => {
  const response = await fetch(
    "https://api.github.com/users/redhwannacef/gists",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gist),
    }
  );

  if (!response.ok) {
    throw Error("something went wrong!");
  }
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Gists />
  </QueryClientProvider>
);

const Gists = () => {
  const { status, data: gists } = useQuery("gistsData", () => fetchGist());
  const { status: mutationStatus, mutateAsync: addGist } = useMutation(
    postGists,
    {
      onSuccess: () => queryClient.invalidateQueries("gistsData"),
    }
  );

  if (status === "loading") return "loading...";
  if (status === "error") return "error";

  const onSubmit = (event) => {
    event.preventDefault();
    const gistInput = event.target.gist;
    const data = { description: gistInput.value };

    addGist(data).then(() => {
      gistInput.value = "";
    });
  };

  return (
    <main>
      <Octocat />
      <form autoComplete="off" onSubmit={onSubmit}>
        <input name="gist" required disabled={mutationStatus === "loading"} />
        <button type="submit" disabled={mutationStatus === "loading"}>
          Add
        </button>
      </form>
      <h1>Gists</h1>
      {gists.map((gist) => (
        <a key={gist.id} href={gist.html_url}>
          <p>{gist.description}</p>
        </a>
      ))}
    </main>
  );
};

export default App;
