import React from "react";
import ReactDOM from "react-dom";
import type { Comment } from "library/dist";
import { InMemoryBackend } from "library/dist/backends";

import "./index.css";

const backend = new InMemoryBackend();

function App() {
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [replyId, setReplyId] = React.useState<string | null>(null);

  async function handleAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const text = formData.get("comment") as string;
    const parentCommentId = formData.get("parentCommentId") as string | null;
    const userId = "someuserid";
    await backend.addComment({ userId, parentCommentId, text });
    setComments(await backend.fetchComments());
    form.reset();
  }

  async function handleReply(event: React.FormEvent<HTMLFormElement>) {
    await handleAdd(event);
    setReplyId(null);
  }

  async function handleDelete(id: string) {
    await backend.deleteComment(id);
    setComments(await backend.fetchComments());
  }

  return (
    <main>
      <h1>Comments</h1>
      <form onSubmit={handleAdd} autoComplete="off">
        <input required name="comment" />
        <button>Comment</button>
      </form>
      {comments
        .filter((comment) => comment.parentCommentId === null)
        .map((comment) => (
          <div key={comment.id} className="comment">
            <div className="parent">
              <label>{comment.text}</label>{" "}
              <button onClick={() => setReplyId(comment.id)}>Reply</button>
              <button onClick={() => handleDelete(comment.id)}>Delete</button>
              {comment.id === replyId ? (
                <form onSubmit={handleReply} autoComplete="off">
                  <input
                    type="hidden"
                    name="parentCommentId"
                    value={comment.id}
                  />
                  <input autoFocus required name="comment" />
                  <button>Add</button>
                </form>
              ) : null}
            </div>
            {comments
              .filter((child) => child.parentCommentId === comment.id)
              .map((child) => (
                <div key={child.id} className="comment">
                  <div className="child">
                    <label>{child.text}</label>{" "}
                    <button onClick={() => setReplyId(child.id)}>Reply</button>
                    <button onClick={() => handleDelete(child.id)}>
                      Delete
                    </button>
                    {child.id === replyId ? (
                      <form onSubmit={handleReply} autoComplete="off">
                        <input
                          type="hidden"
                          name="parentCommentId"
                          value={comment.id}
                        />
                        <input autoFocus required name="comment" />
                        <button>Add</button>
                      </form>
                    ) : null}
                  </div>
                </div>
              ))}
          </div>
        ))}
    </main>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
