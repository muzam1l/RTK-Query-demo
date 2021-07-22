import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './searchSlice'
import unsplashApi from './api'

const store = configureStore({
  reducer: {
    search: searchReducer,
    [unsplashApi.reducerPath]: unsplashApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(unsplashApi.middleware),
})
export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
