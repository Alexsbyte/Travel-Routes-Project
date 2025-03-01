import { userReducer } from '@/entities/user';
import { configureStore } from '@reduxjs/toolkit';
import { routeReducer } from '@/entities/route';
import { pointsReducer } from '@/entities/point/slice';
import { aiReducer } from '@/entities/ai/slice/AiSlice';
import { commentsReducer } from '@/entities/comment/slice/CommentSlice';
import { favoriteReducer } from '@/entities/favorite';

const store = configureStore({
  reducer: {
    user: userReducer,
    route: routeReducer,
    points: pointsReducer,
    ai: aiReducer,
    comments: commentsReducer,
    favorites: favoriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
