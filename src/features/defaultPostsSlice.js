import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    posts: [],
    status: "idle",
    error: ""
};

export const fetchDefaultPosts = createAsyncThunk('posts/fetchPosts', async (subreddit) => {
    const baseUrl = `https://www.reddit.com/${subreddit}.json`;
    const response = await axios.get(baseUrl);
    return response?.data.data.children;
});

export const defaultPostsSlice = createSlice({
    name: "defaultPosts",
    initialState,
    reducers: {
        resetState: () => initialState,
    },
    extraReducers(builder) {
        builder
            .addCase(fetchDefaultPosts.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchDefaultPosts.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.posts = state.posts.concat(action.payload);
            })
            .addCase(fetchDefaultPosts.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
    }
});

//for dispatch
export const { resetState } = defaultPostsSlice.actions;

//for configureStore
export default defaultPostsSlice.reducer;