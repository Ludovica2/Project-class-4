import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import AppHome from "./pages/app/Home"
import Login from "./pages/Login"
import RootLayout from "./layout/RootLayout"
import AppLayout from "./layout/AppLayout"
import { useSelector } from "react-redux"

const ProtectedRoute = ({ children }) => {
    const auth = useSelector((state) => state.auth);

    if (auth.token) return children;

    return <Navigate to="/login" />
}

const App = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<RootLayout />}>
                    <Route path="" element={<Home />} />
                    <Route path="login" element={<Login />} />
                </Route>
                <Route path="/app" element={
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
                }>
                    <Route path="" element={<AppHome />} />
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
