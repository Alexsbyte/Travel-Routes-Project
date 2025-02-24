import { userReducer } from '@/entities/user';
import { configureStore } from '@reduxjs/toolkit';
import { routeReducer } from '@/entities/route';
import { pointsReducer } from '@/entities/point/slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    route: routeReducer,
    points: pointsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
