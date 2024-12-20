import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"

import Feed from "./pages/app/Feed"
import Profile from "./pages/app/Profile"
import Groups from "./pages/app/Groups"
import FoundCalendar from "./pages/app/FoundCalendar"
import Favorites from "./pages/app/Favorites"
import Chat from "./pages/app/Chat"

import Login from "./pages/Login"
import RootLayout from "./layout/RootLayout"
import AppLayout from "./layout/AppLayout"
import { useDispatch, useSelector } from "react-redux"
import SignUp from "./pages/SignUp"
import ForgotPassword from "./pages/ForgotPassword"
import LoginBusiness from "./pages/LoginBusiness"
import SignUpBusiness from "./pages/SignUpBusiness"
import EditProfile from "./pages/app/EditProfile"
import { useLastRole } from "./hooks/useLastRole"
import SettingsProfile from "./pages/app/SettingsProfile"
import { useEffect } from "react"
import SinglePost from "./pages/app/SinglePost"
import SDK from "./SDK"
import { setNotifications } from "./store/slices/notificationSlice"
import { changeDarkMode, setLang, toggleDarkMode, updateSettings } from "./store/slices/settingsSlice"
import InternalProfile from "./pages/app/InternalProfile"
import ExternalProfile from "./pages/app/ExternalProfile"


const ProtectedRoute = ({ children }) => {
    const auth = useSelector((state) => state.auth);
    const lastRole = localStorage.getItem("lastUserRole");

    if (auth.token) {
        if (!lastRole) localStorage.setItem("lastUserRole", auth.user.role);
        return children;
    }

    return <Navigate to={lastRole == "user" ? "/" : "/login-business"} />
}

const App = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { darkMode, lang } = useSelector((state) => state.settings);
    
    const fetchNotifications = async () => {
        try {
            const notifications = await SDK.notifications.getAll(token);
            dispatch(setNotifications(notifications));
        } catch (error) {
            console.log(error);
        }
    }

    const fetchSettings = async () => {
        try {
            const { _id, createdAt, updatedAt, user, ...payload } = await SDK.settings.getAll(token);
            localStorage.setItem("lang", payload.lang);
            localStorage.setItem("darkMode", payload.darkMode);
        } catch (error) {
            console.log(error);
        }
    }

    const saveSettingsUpdates = async (payload) => {
        try {
            await SDK.settings.update(payload, token);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (token) {
            document.body.classList[darkMode ? "add" : "remove"]("dark");
            localStorage.setItem("darkMode", darkMode);
            (async () => {
                saveSettingsUpdates({ darkMode: darkMode });
                dispatch(changeDarkMode(darkMode));
            })();
        }
    }, [darkMode]);

    useEffect(() => {
        localStorage.setItem("lang", lang);
    }, [lang]);

    useEffect(() => {
        if (token) {
            fetchNotifications();
            fetchSettings();
        } else {
            dispatch(setNotifications([]));
        }
    }, [token]);

    return (
        <>
            <Routes>
                <Route path="/" element={<RootLayout />}>
                    <Route path="" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="signup-business" element={<SignUpBusiness />} />
                    <Route path="login-business" element={<LoginBusiness />} />
                </Route>
                <Route path="/app" element={
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
                }>
                    <Route path="/app/feed" element={<Feed />} />
                    <Route path="/app/feed/:post_id" element={<SinglePost />} />
                    <Route path="/app/profile" element={<InternalProfile />} />
                    <Route path="/app/profile/editprofile" element={<EditProfile />} />
                    <Route path="/app/profile/settingsprofile" element={<SettingsProfile />} />
                    <Route path="/app/profile/:nickname" element={<ExternalProfile />} />
                    <Route path="/app/groups" element={<Groups />} />
                    <Route path="/app/calendar" element={<FoundCalendar />} />
                    <Route path="/app/favorites" element={<Favorites />} />
                    <Route path="/app/chat" element={<Chat />} />
                </Route>
            </Routes>
        </>
    )
}

export default App

// Public
// http://localhost:5173/ -> Home.jsx
// http://localhost:5173/login -> Login.jsx
// Private
// http://localhost:5173/app -> app/Feed.jsx
// http://localhost:5173/app/profile -> app/Profile.jsx
// http://localhost:5173/app/pages -> app/Pages.jsx
