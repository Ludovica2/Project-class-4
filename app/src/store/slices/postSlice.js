import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState: {
        all: [],
        currentProfile: [],
    },
    reducers: {
        setAllPosts: (state, { payload }) => { 
            state.all = payload;
        },
        setAllProfilePosts: (state, { payload }) => { 
            state.currentProfile = payload;
        },
    }
});

export const { setAllPosts, setAllProfilePosts } = postSlice.actions;

export default postSlice.reducer;