import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState: {
        type: {
            basic: "Base", 
            review: "Recensione",
            event: "Evento"
        },
    },
    reducers: {
        addPost: (state, { payload }) => { 

        }
    }
});

export const { addPost } = postSlice.actions;
export default postSlice.reducer;