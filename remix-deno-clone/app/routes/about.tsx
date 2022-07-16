import * as React from "react";
import type { LinksFunction, LoaderFunction, MetaFunction } from "reno";
import { Outlet, Link, useLoaderData } from "reno";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: "/styles/about.css" }];
};

export const meta: MetaFunction = () => {
  return { title: "About" };
};

export const loader: LoaderFunction = () => {
  return { colours: ["Red", "Green", "Blue"] };
};

export default function About() {
  const data = useLoaderData<{ colours: string[] }>();
  return (
    <>
      <h2>Hello from routes/about.tsx</h2>
      <p>Colours from loader</p>
      <ul>
        {data.colours.map((colour) => (
          <li key="colour">
            <Link to={`/about/${colour}`}>{colour}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  );
}
