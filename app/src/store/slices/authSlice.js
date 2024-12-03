import { createSlice } from "@reduxjs/toolkit";

const auth = JSON.parse(localStorage.getItem("auth"));

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: auth?.token || null,
        user: auth?.user || null
    },
    reducers: {
        login: (state, { payload }) => { // payload = { token, user }
            state.token = payload.token;
            state.user = payload.user;

            localStorage.setItem("auth", JSON.stringify({ ...state }));
        },
        logout: (state) => {
            state.token = null;
            state.user = null;

            localStorage.removeItem("auth");
        },
        updateUser: (state, {payload}) => {
            state.user = {...state.user, ...payload};

            localStorage.setItem("auth", JSON.stringify({ ...state }));
        }
    }
});

export const { login, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;