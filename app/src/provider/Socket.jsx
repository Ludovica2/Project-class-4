import { createContext, useContext, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { config } from "../config/config";
import { useNotify } from "../hooks/useNotify";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const { token, user } = useSelector((state) => state.auth);
    const notify = useNotify(token);
    const socket = useMemo(() => io(config.API_SOCKET_URL, { autoConnect: false, extraHeaders: { token: `Bearer ${token}` } }), [token]);

    useEffect(() => {
        if (token) {
            socket.connect();

            socket.on("connect", () => {
                console.log("Connected to the socket server");
            });

            socket.on("new-user-offline", ({ user: _user }) => {
                // Set online/offline status -> JUST EXAMPLE
                if (user._id !== _user._id) {
                    notify({ image: _user.avatar, title: `${_user.first_name} ${_user.last_name}`, content: "is now offline" });
                }
            });

            socket.on("new-user-online", ({ user: _user }) => {
                // Set online/offline status -> JUST EXAMPLE
                if (user._id !== _user._id) {
                    notify({ image: _user.avatar, title: `${_user.first_name} ${_user.last_name}`, content: "is now online" });
                }
            });

            socket.on("new-chat-message", ({ message, notification }) => {
                console.log(message);
                notify(notification);
            });

            socket.on("new-notification", (notification) => {
                notify(notification);
            });
        } else {
            socket.disconnect();
            console.log("Disconnected from the socket server");
        }

        return () => {
            socket.disconnect();
            console.log("Disconnected from the socket server");
        }
    }, [token]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
    const context = useContext(SocketContext);

    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }

    return context;
}