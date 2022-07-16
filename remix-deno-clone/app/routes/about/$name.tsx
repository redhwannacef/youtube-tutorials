import * as React from "react";
import type { LoaderFunction, MetaFunction } from "reno";
import { useLoaderData } from "reno";

export const meta: MetaFunction = ({ params }) => {
  return { title: `Hello ${params.name}` };
};

export const loader: LoaderFunction = async ({ params }) => {
  return params;
};

export default function AboutIndex() {
  const data = useLoaderData();
  return (
    <>
      <h3>Hello from about/$name.tsx</h3>
      <p>Params from url/loader:</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
