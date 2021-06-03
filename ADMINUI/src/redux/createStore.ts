import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./Auth";
import { CustomerReducer } from "./Customer";

// ...

export const store = configureStore({
  reducer: {   
    Auth: AuthReducer,
    Customer: CustomerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
