import { rest } from "msw";
import { setupWorker } from "msw";
import { whenThen, get, ok, post } from "msw-when-then";

let nextId = 3;

let db = [
  {
    id: 1,
    html_url: "https://gist.github.com/redhwannacef",
    description: "some description",
  },
  {
    id: 2,
    html_url: "https://gist.github.com/redhwannacef",
    description: "another one",
  },
];

export const start = () => {
  const worker = setupWorker();

  const { when } = whenThen(worker, rest);
  when(get("https://api.github.com/users/redhwannacef/gists")).thenReturn(
    ok(db)
  );

  when(post("https://api.github.com/users/redhwannacef/gists")).then(
    (req, res, ctx) => {
      db.push({
        id: nextId++,
        html_url: "https://gist.github.com/redhwannacef",
        ...req.body,
      });
      return res(ctx.delay(2000), ctx.status(200));
    }
  );

  worker.start();
};
