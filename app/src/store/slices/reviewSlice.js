import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
    name: "review",
    initialState: {
        currentProfileReviews: [],
    },
    reducers: {
        setCurrentProfileReviews: (state, { payload }) => {
            state.currentProfileReviews = payload;
        },
        setCurrentProfileNewReview: (state, { payload }) => {
            state.currentProfileReviews.unshift(payload);
        }
    }
});

export const { setCurrentProfileReviews, setCurrentProfileNewReview } = reviewSlice.actions;

export default reviewSlice.reducer;