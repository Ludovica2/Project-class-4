import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
    name: "review",
    initialState: {
        currentProfileReviews: [],
    },
    reducers: {
        setCurrentProfileReviews: (state, { payload }) => {
            state.currentProfileReviews = payload;
        }
    }
});

export const { setCurrentProfileReviews } = reviewSlice.actions;

export default reviewSlice.reducer;