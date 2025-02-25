import { userReducer } from '@/entities/user';
import { configureStore } from '@reduxjs/toolkit';
import { routeReducer } from '@/entities/route';
import { pointsReducer } from '@/entities/point/slice';
import { moderationReducer } from '@/entities/moderation/slice/ModerationSlice';
import { commentReducer } from '@/entities/comment/slice/CommentSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    route: routeReducer,
    points: pointsReducer,
    moderation: moderationReducer,
    comment: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
