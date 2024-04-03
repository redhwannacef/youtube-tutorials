import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [readme, setReadme] = useState("loading...");

  useEffect(() => {
    function fetchReadme() {
      fetch("/README.md")
        .then((res) => res.text())
        .then(setReadme);
    }
    fetchReadme();

    if (import.meta.hot) import.meta.hot.on("readme-update", fetchReadme);
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <textarea />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR testing hmr!!
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <h2>README.md</h2>
        <pre style={{ fontSize: "24px" }}>{readme}</pre>
      </div>
    </>
  );
}

export default App;
