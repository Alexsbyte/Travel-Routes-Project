export interface RawCommentData {
  text: string;
  route_id: number;
  user_id: number;
}


export type CommentType = {
  id: number;
  text: string;
  route_id: number;
  user_id: number;
  createdAt: Date;
  updatedAt: Date;
};


export type ArrayCommentsType = CommentType[];