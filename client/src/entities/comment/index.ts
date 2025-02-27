export { commentsReducer } from './slice/CommentSlice';

export {
  createCommentThunk,
  deleteCommentThunk,
  getOneRouteCommentsThunk,
} from './api/CommentThunk';

export type {
  CommentType,
  RawCommentData,
  ArrayCommentsType,
} from './model/CommentTypes';
