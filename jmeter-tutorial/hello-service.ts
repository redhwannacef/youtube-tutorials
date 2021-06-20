import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {
  const performSomeHeavyComputation = () => {
    for (let i = 0; i < 1_000_000_000; i++) {
      // do nothing
    }
  };

  performSomeHeavyComputation();

  ctx.response.body = "Hello World!";
});

await app.listen({ port: 8002 });

console.log(`HTTP webserver running.  Access it at:  http://localhost:8002/`);
