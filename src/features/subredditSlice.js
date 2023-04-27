import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    posts: [],
    status: "idle",
    error: ""
};

export const fetchPopularSubreddits = createAsyncThunk('posts/fetchPopularSubreddits', async () => {
    const baseUrl = `https://www.reddit.com/r/popular.json`;
    const response = await axios.get(baseUrl);
    return response?.data.data.children;
});

export const subredditSlice = createSlice({
    name: "subreddits",
    initialState,
    reducers: {
        resetSubredditState: () => initialState,
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPopularSubreddits.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchPopularSubreddits.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.posts = state.posts.concat(action.payload);
            })
            .addCase(fetchPopularSubreddits.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
    }
});

//for dispatch
export const { resetSubredditState } = subredditSlice.actions;

//for configureStore
export default subredditSlice.reducer;