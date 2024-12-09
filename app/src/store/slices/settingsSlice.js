import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        darkMode: false,
        social: {
            instagram: {
                title: "Instagram",
                isActive: false,
                content: "",
            },
            facebook: {
                title: "Facebook",
                isActive: false,
                content: "",
            },
            tiktok: {
                title: "TikTok",
                isActive: false,
                content: "",
            },
            threads: {
                title: "Threads",
                isActive: false,
                content: "",
            },
            youtube: {
                title: "YouTube",
                isActive: false,
                content: "",
            },
            pinterest: {
                title: "Pinterest",
                isActive: false,
                content: "",
            },
            linkedin: {
                title: "Linkedin",
                isActive: false,
                content: "",
            }
        } 
    },
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        }, 
        changeSocialSettings: (state, {payload}) => {
            state.social = {...state.social, [payload.name]: payload.value};
        }
    }
});

export const { toggleDarkMode, changeSocialSettings } = settingsSlice.actions;
export default settingsSlice.reducer;