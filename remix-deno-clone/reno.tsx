import * as React from "react";
import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { extname } from "https://deno.land/std@0.146.0/path/mod.ts";
import { walkSync } from "https://deno.land/std@0.128.0/fs/walk.ts";
import Root from "./app/root.tsx";

const basePath = ".";
const staticDir = basePath + "/public";
const appDir = basePath + "/app";
const routesDir = appDir + "/routes";

export default function start(clientHandler: Handler) {
  const routes: RegexRoute[] = sortedRoutes();
  serve((request) => handler(request, routes, clientHandler));
}

async function handler(
  request: Request,
  routes: RegexRoute[],
  clientHandler: Handler
) {
  const path = new URL(request.url).pathname;
  const isStatic = extname(path).length > 0;
  return isStatic
    ? renderStatic(path)
    : await renderRoutes(path, routes, clientHandler);
}

function renderStatic(path: string) {
  const file = readStaticFile(path);
  const readableStream = file.readable;
  return new Response(readableStream, {
    headers: { "Content-Type": contentTypes[extname(path)] },
  });
}

function readStaticFile(path: string) {
  try {
    return Deno.openSync(staticDir + path, { read: true });
  } catch (e) {
    return Deno.openSync(appDir + path, { read: true });
  }
}

const contentTypes: Record<string, string> = {
  ".ico": "image/x-icon",
  ".css": "text/css",
};

async function renderRoutes(
  path: string,
  routes: RegexRoute[],
  clientHandler: Handler
) {
  const matchedRoutes = matchRoutes(formatPath(path), routes);
  const modules = await asModules(matchedRoutes);
  const meta = metaFromModules(modules);
  const links = linksFromModules(modules);
  const loaderData = await loaderDataFromModules(modules);
  const context = {
    routes: modules,
    meta,
    links,
    loaderData,
  };
  console.log(context)
  return clientHandler(context);
}

async function asModules(routes: RawRoutes[]) {
  return await Promise.all(
    routes.map(async (route) => ({
      module: await import(route.path),
      groups: route.groups,
    }))
  );
}

function metaFromModules(routes: Route[]) {
  return routes.map((route) =>
    route.module.meta ? route.module.meta({ params: route.groups }) : {}
  );
}

function linksFromModules(routes: Route[]) {
  return routes.map((route) =>
    route.module.links ? route.module.links() : []
  );
}

async function loaderDataFromModules(routes: Route[]) {
  return await Promise.all(
    routes.map(async (route) =>
      route.module.loader
        ? await route.module.loader({ params: route.groups })
        : {}
    )
  );
}

function formatPath(path: string) {
  const ending = path.endsWith("/") ? "index" : "/index";
  return path + ending;
}

function matchRoutes(path: string, routes: RegexRoute[]) {
  return [root(), ...matchRoutesWithPath(routes, path)];
}

function matchRoutesWithPath(routes: RegexRoute[], path: string) {
  const paths = pathToPaths(path);
  return routes
    .map((route) => {
      const match = matchRoute(route.regex, paths);
      return match ? { path: route.path, groups: match?.groups || {} } : null;
    })
    .filter((value) => value !== null) as RawRoutes[];
}

function root() {
  return { path: "./app/root.tsx", groups: {} };
}

function matchRoute(regex: string, parts: string[]) {
  for (const part of parts) {
    const match = part.match(regex);
    if (match) return match;
  }
  return null;
}

function sortedRoutes() {
  const allRoutes = getFiles(routesDir).map(asRegex);
  allRoutes.sort((a, b) =>
    pathToPaths(a.path).length - pathToPaths(b.path).length ||
    a.path.includes("index.tsx")
      ? -1
      : 1
  );
  return allRoutes;
}

function getFiles(path: string) {
  const files = [];
  for (const entry of walkSync(path))
    if (entry.isFile) files.push(`${basePath}/${entry.path}`);
  return files;
}

function asRegex(route: string) {
  return {
    path: route,
    regex: route.split("/").map(toRegex).join("/"),
  };
}

function toRegex(part: string) {
  if (!part.startsWith("$")) return part;
  const [name, ext] = part.split(".");
  const regexName = name.replace("$", "(?<").concat(">.+)");
  return ext ? `${regexName}\\.${ext}` : regexName;
}

function pathToPaths(path: string) {
  let base = "";
  return path
    .split("/")
    .map((p) => "/" + p)
    .splice(1)
    .map((v) => {
      base += v;
      const end = base.endsWith(".tsx") ? "" : ".tsx";
      return routesDir + base + end;
    });
}

export const RoutesContext = React.createContext<EntryContext>({
  routes: [],
  meta: [],
  links: [],
  loaderData: [],
});

export const CountContext = React.createContext<number>(0);

export function RenoServer({ context }: { context: EntryContext }) {
  return (
    <RoutesContext.Provider
      value={context}
      children={<CountContext.Provider value={0} children={<Root />} />}
    />
  );
}

export function Outlet() {
  const { routes } = React.useContext(RoutesContext);
  const count = React.useContext(CountContext);
  const route = routes[count + 1];
  if (!route) return null;
  const Component = route.module.default;
  return <CountContext.Provider value={count + 1} children={<Component />} />;
}

export function Links() {
  const { links } = React.useContext(RoutesContext);
  return (
    <>
      {links.flat().map((link) => (
        <link {...link} />
      ))}
    </>
  );
}

export function Meta() {
  const { meta } = React.useContext(RoutesContext);
  const metaTags = meta.reduce((acc, cur) => ({ ...acc, ...cur }), {});
  return (
    <>
      {Object.entries(metaTags).map(([name, content]) =>
        name === "title" ? (
          <title>{content}</title>
        ) : (
          <meta name={name} content={content} />
        )
      )}
    </>
  );
}

export function Link({ to, ...rest }: LinkProps) {
  return <a href={to} {...rest} />;
}

export function useLoaderData<T>(): T {
  const { loaderData } = React.useContext(RoutesContext);
  const count = React.useContext(CountContext);
  return loaderData[count];
}

export type LinkDescriptor = Params;
export type MetaFunction = (args: LoaderArgs) => Params;
export type LinksFunction = () => LinkDescriptor[];
export type LoaderFunction = (args: LoaderArgs) => Promise<AppData> | AppData;
export type LoaderArgs = { params: Params };
export type EntryContext = {
  routes: Route[];
  meta: Params[];
  links: LinkDescriptor[][];
  loaderData: AppData[];
};

type Params = Record<string, string>;
type AppData = any;
type RenoModule = {
  default: React.ComponentType;
  meta?: MetaFunction;
  links?: LinksFunction;
  loader?: LoaderFunction;
};
type Route = {
  module: RenoModule;
  groups: Params;
};
type RawRoutes = { path: string; groups: Params };
type Handler = (context: EntryContext) => Response;
type RegexRoute = { path: string; regex: string };
type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
};
