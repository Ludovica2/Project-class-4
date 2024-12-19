import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        rooms: [],
        writing: {
            room: null,
            user: null,
        }
    },
    reducers: {
        setRooms: (state, { payload }) => {
            state.rooms = payload;
        },
        addRoom: (state, { payload }) => {
            if (state.rooms.find(room => room._id === payload._id)) {
                return;
            }

            state.rooms.push(payload);
        },
        setUserStatus: (state, { payload }) => { // { user, status }
            state.rooms.forEach(({ users }) => {
                users.forEach(user => {
                    if (user._id == payload.user) user.chat_status = payload.status;
                })
            });
        },
        addMessage: (state, { payload }) => { // { room_id, message }
            const room = state.rooms.find(room => room._id === payload.room_id);

            if (room) {
                room.messages.push(payload.message);
            }
        },
        readMessage: (state, { payload }) => { // room_id, to
            const room = state.rooms.find(room => room._id === payload.room_id);

            if (room) {
                room.messages.forEach((message) => {
                    if (message.to._id == payload.to) message.is_read = true;
                });
            }
        },
        setWritinMessage: (state, { payload }) => { // { room, user }
            state.writing = { ...payload };
        }
    }
});

export const { setRooms, addRoom, setUserStatus, addMessage, readMessage, setWritinMessage } = chatSlice.actions;

export default chatSlice.reducer;