import type { CommentsBackend, NewComment, Comment } from "./index";

export class InMemoryBackend implements CommentsBackend {
  private comments: Comment[] = [];
  private id = 0;

  fetchComments(): Promise<Comment[]> {
    return Promise.resolve(this.comments);
  }

  addComment(comment: NewComment): Promise<void> {
    this.comments = [
      ...this.comments,
      {
        id: String(this.id++),
        createdAt: new Date(),
        ...comment,
      },
    ];
    return Promise.resolve();
  }

  deleteComment(id: string): Promise<void> {
    this.comments = this.comments.filter(
      (comment) => comment.parentCommentId !== id && comment.id !== id
    );
    return Promise.resolve();
  }
}

// Test

const backend = new InMemoryBackend();
console.log(await backend.fetchComments());
await backend.addComment({ userId: "0", parentCommentId: null, text: "Hi" });
console.log(await backend.fetchComments());
await backend.deleteComment("0");
console.log(await backend.fetchComments());
