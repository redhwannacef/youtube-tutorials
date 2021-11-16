import { LoaderFunction, useLoaderData } from "remix";

export let loader: LoaderFunction = async ({ params }) => {
  return params;
};

export default function Title() {
  const { title } = useLoaderData<{ title: string }>();
  return <h1>Title: {title}</h1>;
}
