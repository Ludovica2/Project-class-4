import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"

import Feed from "./pages/app/Feed"
import Profile from "./pages/app/Profile"
import Groups from "./pages/app/Groups"
import Calendar from "./pages/app/Calendar"
import Favorites from "./pages/app/Favorites"
import Chat from "./pages/app/Chat"

import Login from "./pages/Login"
import RootLayout from "./layout/RootLayout"
import AppLayout from "./layout/AppLayout"
import { useSelector } from "react-redux"
import SignUp from "./pages/SignUp"
import ForgotPassword from "./pages/ForgotPassword"


const ProtectedRoute = ({ children }) => {
    const auth = useSelector((state) => state.auth);

    if (auth.token) return children;

    return <Navigate to="/" />
}

const App = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<RootLayout />}>
                    <Route path="" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="forgotpassword" element={<ForgotPassword />} />
                </Route>
                <Route path="/app" element={
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
                }>
                    <Route path="/app/feed" element={<Feed />} />
                    <Route path="/app/profile" element={<Profile />} />
                    <Route path="/app/groups" element={<Groups />} />
                    <Route path="/app/calendar" element={<Calendar />} />
                    <Route path="/app/favorites" element={<Favorites />} />
                </Route>
                <Route path="/app/chat" element={
                    <ProtectedRoute>
                        <Chat />
                    </ProtectedRoute>} />
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
