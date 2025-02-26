import { userReducer } from '@/entities/user';
import { configureStore } from '@reduxjs/toolkit';
import { routeReducer } from '@/entities/route';
import { pointsReducer } from '@/entities/point/slice';
import { aiReducer } from '@/entities/ai/slice/AiSlice';
import { commentsReducer } from '@/entities/comment/slice/CommentSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    route: routeReducer,
    points: pointsReducer,
    ai: aiReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
