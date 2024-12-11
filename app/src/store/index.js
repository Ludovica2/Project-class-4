import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import eventSlice from "./slices/eventSlice"
import settingsSlice from "./slices/settingsSlice";
import postSlice from "./slices/postSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
        event: eventSlice,
        settings: settingsSlice,
        posts: postSlice,
    }
});