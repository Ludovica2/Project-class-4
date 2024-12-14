import { createContext, useContext, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { config } from "../config/config";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const socket = useMemo(() => io("http://localhost:3031", { autoConnect: false, extraHeaders: { token: `Bearer ${token}` } }), [token]);

    useEffect(() => {
        if (token) {
            socket.connect();

            socket.on("connect", () => {
                console.log("Connected to the socket server");
            });

            socket.on("new-chat-message", (message) => {
                console.log(message);
            });

            socket.on("new-notification", (notification) => {
                toast.info(notification.content, {
                    onClick: () => {
                        navigate(notification.link.replace(config.CLIENT_URL, ""));
                    }
                });
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