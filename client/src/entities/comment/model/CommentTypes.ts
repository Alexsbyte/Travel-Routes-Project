import { UserType } from '@/entities/user';

export type RawCommentData = {
  text: string;
};

export type CommentType = {
  id: number;
  text: string;
  userComment: UserType;
  route_id: number;
  user_id: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ArrayCommentsType = CommentType[];
