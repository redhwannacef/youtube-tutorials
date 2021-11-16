import { Outlet } from "react-router-dom";
import { ActionFunction, redirect } from "remix";

export const action: ActionFunction = async ({ request }) => {
  const body = new URLSearchParams(await request.text());
  const title = body.get("title");
  return redirect("/create/" + title);
};

export default function Create() {
  return (
    <>
      <h1>create</h1>
      <Outlet />
    </>
  );
}
