import * as React from "react";
import type { MetaFunction, LinksFunction } from "reno";
import { Link, Links, Meta, Outlet } from "reno";

export const meta: MetaFunction = () => ({
  title: "New Remix App",
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: "/styles/index.css" }];
};

export default function App() {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
      </body>
    </html>
  );
}

function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <header>
        <h1>Reno</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
