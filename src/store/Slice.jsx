import { createSlice } from "@reduxjs/toolkit";

const materialSlice = createSlice({
    name: 'material',
    initialState: [],
    reducers: {
        addItem(state, action) {
            state.push(...action.payload)
        },
        removeItem(state, action) {
            const find = state.findIndex(val => val.id == action.payload.id);
            if (find >= 0) {
                state.splice(find, 1);
            }
        }
    }
})

export default materialSlice.reducer;
export const { addItem, removeItem } = materialSlice.actions;