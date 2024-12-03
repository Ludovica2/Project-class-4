import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import eventSlice from "./slices/eventSlice"

export default configureStore({
    reducer: {
        auth: authSlice,
        event: eventSlice,
    }
});