import { userReducer } from '@/entities/user';
import { configureStore } from '@reduxjs/toolkit';
import { routeReducer } from '@/entities/route';
import { moderationReducer } from '@/entities/moderation/slice/ModerationSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    route: routeReducer,
    moderation: moderationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
