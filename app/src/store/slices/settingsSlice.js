import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        darkMode: localStorage.getItem("darkMode") === "true" || false,
        notify: false,
        lastUserRole: "user",
        currentProfileId: null,
        lang: localStorage.getItem("lang") || "it",
        social: {
            instagram: {
                title: "Instagram",
                image: "/images/instagram.png",
                isActive: false,
                content: "",
            },
            facebook: {
                title: "Facebook",
                image: "/images/facebook.png",
                isActive: false,
                content: "",
            },
            tiktok: {
                title: "TikTok",
                image: "/images/tiktok.png",
                isActive: false,
                content: "",
            },
            threads: {
                title: "Threads",
                image: "/images/threads.png",
                isActive: false,
                content: "",
            },
            youtube: {
                title: "YouTube",
                image: "/images/youtube.png",
                isActive: false,
                content: "",
            },
            pinterest: {
                title: "Pinterest",
                image: "/images/pinterest.png",
                isActive: false,
                content: "",
            },
            linkedin: {
                title: "Linkedin",
                image: "/images/linkedin.png",
                isActive: false,
                content: "",
            }
        },
        device: {
            camera: {
                title: "Fotocamera",
                isActive: false,
            },
            contact: {
                title: "Contatti",
                isActive: false,
            },
            position: {
                title: "Posizione",
                isActive: false,
            },
            micro: {
                title: "Microfono",
                isActive: false,
            },
            gallery: {
                title: "Galleria",
                isActive: false,
            },
        } 
    },
    reducers: {
        updateSettings: (state, { payload }) => {
            state.darkMode = payload.darkMode;
        },
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        },
        changeDarkMode: (state, { payload }) => {
            state.darkMode = payload;
        },
        toggleNotify: (state) => {
            state.notify = !state.notify;
        }, 
        changeSocialSettings: (state, { payload }) => {
            state.social = {...state.social, [payload.name]: payload.value};
        },
        changeDeviceSettings: (state, { payload }) => {
            state.device = {...state.device, [payload.name]: payload.value};
        },
        changeLastUserRole: (state, { payload }) => {
            state.lastUserRole = payload;
        },
        setCurrentProfileId: (state, { payload }) => {
            state.currentProfileId = payload;
        },
        setLang: (state, { payload }) => {
            state.lang = payload;
        }
    }
});

export const { updateSettings, toggleDarkMode, changeDarkMode, toggleNotify, changeSocialSettings, changeDeviceSettings, changeLastUserRole, setCurrentProfileId, setLang } = settingsSlice.actions;
export default settingsSlice.reducer;