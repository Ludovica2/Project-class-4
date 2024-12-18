import { createSlice } from "@reduxjs/toolkit";

const drawerSlice = createSlice({
    name: "drawer",
    initialState: {
        isOpenReviewDrawer: false,
    },
    reducers: {
        setIsOpenReviewDrawer: (state, { payload }) => {
            state.isOpenReviewDrawer = payload;
        }
    }
});

export const { setIsOpenReviewDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;