import * as React from "react";
import type { EntryContext } from "reno";
import { RenoServer } from "reno";
import { renderToString } from "react-dom/server";

export default function handleRequest(context: EntryContext) {
  const markup = renderToString(<RenoServer context={context} />);

  return new Response("<!DOCTYPE html>" + markup, {
    headers: { "Content-Type": "text/html" },
  });
}
