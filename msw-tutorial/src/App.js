import React, { useEffect, useState } from "react";
import "./App.css";
import { setupWorker } from "msw";

if(process.env.NODE_ENV === "development") {
  const {handlers} = require("./handlers");
  const worker = setupWorker(...handlers);
  worker.start();
}

const fetchUser = async () => {
  const response = await fetch("http://localhost:8080/api/user");
  if (!response.ok) {
    throw Error("some useful message");
  }
  return response.json();
};

const App = () => {
  const [username, setUsername] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetchUser()
      .then(user => {
        setUsername(user.username);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <h2>Error fetching user</h2>;

  return <h1>Welcome, {username}.</h1>;
};

export default App;
