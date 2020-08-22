import React from "react";
import { render, waitFor } from "@testing-library/react";
import App from "./App";
import { setupServer } from "msw/node";
import { handlers } from "./handlers";
import { rest } from "msw";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test("renders welcome message when user is fetched successfully", async () => {
  const { getByText } = render(<App />);

  expect(getByText(/Loading.../i)).toBeInTheDocument();

  await waitFor(() =>
    expect(getByText(/Welcome, Redhwan Nacef./i)).toBeInTheDocument()
  );
});

test("renders error message when user fetch fails", async () => {
  server.use(
    rest.get(
      "http://localhost:8080/api/user",
      (req, res, context) => {
        return res(context.status(400));
      }
    )
  );

  const { getByText } = render(<App />);

  expect(getByText(/Loading.../i)).toBeInTheDocument();

  await waitFor(() =>
    expect(getByText(/Error fetching user/i)).toBeInTheDocument()
  );
});
