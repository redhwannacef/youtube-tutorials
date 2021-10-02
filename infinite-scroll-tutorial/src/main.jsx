import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient({
  defaultOptions: { queries: { suspense: true } },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <React.Suspense fallback="Loading...">
        <App />
      </React.Suspense>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
