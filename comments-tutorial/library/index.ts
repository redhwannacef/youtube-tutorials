export type Comment = {
  id: string;
  userId: string;
  createdAt: Date;
  text: string;
  parentCommentId: string | null;
};

export type NewComment = Pick<Comment, "userId" | "text" | "parentCommentId">;

export interface CommentsBackend {
  fetchComments(): Promise<Comment[]>;
  addComment(comment: NewComment): Promise<void>;
  deleteComment(id: string): Promise<void>;
}
