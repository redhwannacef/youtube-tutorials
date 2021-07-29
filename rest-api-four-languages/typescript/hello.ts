import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router().get("/ping-javascript", (context) => {
  context.response.body = { message: "pong-javascript" };
});

await new Application().use(router.routes()).listen({ port: 8002 });
