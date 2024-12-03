import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import eventSlice from "./slices/eventSlice"
import settingsSlice from "./slices/settingsSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
        event: eventSlice,
        settings: settingsSlice,
    }
});