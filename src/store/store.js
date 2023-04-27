import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import defaultPostsReducer from '../features/defaultPostsSlice';
import subredditPostsReducer from '../features/subredditSlice';
 
const store = configureStore({
  reducer: {
    theme: themeReducer,
    defaultPosts: defaultPostsReducer,
    popularSubreddits: subredditPostsReducer
  },
});

export default store;