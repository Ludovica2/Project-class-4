import { createContext, useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { config } from "../config/config";
import { useNotify } from "../hooks/useNotify";
import { addMessage, readMessage, setUserStatus, setWritinMessage } from "../store/slices/chatSlice";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const dispatch = useDispatch();
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
                    // notify({ image: _user.avatar, title: `${_user.first_name} ${_user.last_name}`, content: "is now offline" });
                    dispatch(setUserStatus({ user: _user._id, status: "offline" }));
                }
            });

            socket.on("new-user-online", ({ user: _user }) => {
                // Set online/offline status -> JUST EXAMPLE
                if (user._id !== _user._id) {
                    // notify({ image: _user.avatar, title: `${_user.first_name} ${_user.last_name}`, content: "is now online" });
                    dispatch(setUserStatus({ user: _user._id, status: "online" }));
                }
            });

            socket.on("new-chat-message", async ({ room, message, notification }) => {
                if (notification) notify(notification);
                // fetch rooms from the server
        
                dispatch(addMessage({ room_id: room, message }));
            });

            socket.on("read-messages", ({ room }) => {
                dispatch(readMessage({ room_id: room, to: user._id }));
            })

            socket.on("new-notification", (notification) => {
                notify(notification);
            });
            
            socket.on("write-message", ({ room, user }) => {
                dispatch(setWritinMessage({ room, user }));
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
    const socket = useContext(SocketContext);

    if (!socket) {
        throw new Error("useSocket must be used within a SocketProvider");
    }

    return socket;
}