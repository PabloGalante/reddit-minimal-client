import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  themeValue: 'light',
}

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
      changeTheme: (state, action) => {
        state.themeValue = action.payload;
      }
    }
});

//for dispatch
export const { changeTheme } = themeSlice.actions;

//for configureStore
export default themeSlice.reducer;