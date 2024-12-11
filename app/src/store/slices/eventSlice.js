import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
    name: "event",
    initialState: {
        all: [],
    },
    reducers: {
        setAllEvents: (state, {payload}) => {
            payload = payload.map(p => ({
                ...p, 
                start: p.start instanceof Date ? p.start.toLocaleString() : p.start,
                end: p.end instanceof Date ? p.end.toLocaleString() : p.end,
            }))
            console.log(payload);
            
            state.all = payload
        },
        createNewEvent: (state, {payload}) => {
            state.all.push(payload)
        },
        updateEvent: (state, {payload}) => { /* {_id, values} */
            const index = state.all.findIndex((e) => e._id == payload._id);
            console.log(payload);
            
            state.all[index] = {...state.all[index], ...payload.values};
        },
        deleteEvent: (state, {payload}) => { /* _id */
            state.all = state.all.filter((e) => e._id != payload)
        }
    }
})

export const {setAllEvents, createNewEvent, updateEvent, deleteEvent} = eventSlice.actions;
export default eventSlice.reducer;