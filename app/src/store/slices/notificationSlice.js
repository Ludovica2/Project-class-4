import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
    name: "notifications",
    initialState: {
        all: [],
    },
    reducers: {
        setNotifications: (state, action) => {
            state.all = action.payload;
        },
        addNotification: (state, action) => {
            state.all.push(action.payload);
        },
        removeNotification: (state, action) => {
            state.all = state.all.filter((notification) => notification.id !== action.payload);
        },
    },
});

export const { setNotifications, addNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;