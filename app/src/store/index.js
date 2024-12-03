import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import settingsSlice from "./slices/settingsSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
        settings: settingsSlice,
    }
});