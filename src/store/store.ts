import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import assistantsSlice from './assistantsSlice';
import dashboardSlice from './dashboardSlice';

import './assistantsSlice/middlewares/assistantsStartListener';
import './assistantsSlice/middlewares/assistantsStatusListener';
import './dashboardSlice/middlewares/dashboardStartListener';
import './dashboardSlice/middlewares/dashboardStatusListener';
import { listenerMiddleware } from './listenerMiddleware';

const store = configureStore({
  reducer: {
    assistants: assistantsSlice,
    dashboard:dashboardSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
