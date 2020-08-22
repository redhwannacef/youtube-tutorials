import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import GistSearch from "./App";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { badRequest, get, ok, whenThen } from "msw-when-then";

const server = setupServer();

const { when } = whenThen(server, rest);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test("displays gist descriptions when searching with a valid username", async () => {
  when(get("https://api.github.com/users/avalidusername/gists")).thenReturn(
    ok([{ id: 1, html_url: "someurl", description: "some gist" }])
  );

  const { getByText, findByText, getByLabelText } = render(<GistSearch />);
  const input = getByLabelText("username-input");
  await userEvent.type(input, "avalidusername");
  fireEvent.click(getByText(/search/i));

  expect(await findByText(/gists for avalidusername/i)).toBeInTheDocument();
  expect(getByText(/some gist/i)).toBeInTheDocument();
});

test("displayed gists link to github gist", async () => {
  when(get("https://api.github.com/users/avalidusername/gists")).thenReturn(
    ok([{ id: 1, html_url: "#someurl", description: "some gist" }])
  );

  const { getByText, getByLabelText } = render(<GistSearch />);
  const input = getByLabelText("username-input");
  await userEvent.type(input, "avalidusername");
  fireEvent.click(getByText(/search/i));

  await waitFor(() =>
    expect(getByText(/some gist/i).getAttribute("href")).toBe("#someurl")
  );
});

test("error is shown for any api issue", async () => {
  when(get("https://api.github.com/users/notimportant/gists")).thenReturn(
    badRequest()
  );

  const { getByText, getByLabelText } = render(<GistSearch />);
  const input = getByLabelText("username-input");
  await userEvent.type(input, "notimportant");
  fireEvent.click(getByText(/search/i));

  await waitFor(() =>
    expect(getByText(/oops, something went wrong./i)).toBeInTheDocument()
  );
});

test("username search is required", async () => {
  const { getByText } = render(<GistSearch />);
  fireEvent.click(getByText(/search/i));

  expect(getByText(/a search term is needed/i)).toBeInTheDocument();
});

test("shows message if user has no gists", async () => {
  when(get("https://api.github.com/users/userwithnogists/gists")).thenReturn(
    ok([])
  );

  const { getByText, getByLabelText } = render(<GistSearch />);
  const input = getByLabelText("username-input");
  await userEvent.type(input, "userwithnogists");
  fireEvent.click(getByText(/search/i));

  await waitFor(() => expect(getByText(/no gists found/i)).toBeInTheDocument());
});

