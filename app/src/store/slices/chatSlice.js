import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        rooms: [],
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
        }
    }
});

export const { setRooms, addRoom, addMessage, readMessage } = chatSlice.actions;

export default chatSlice.reducer;