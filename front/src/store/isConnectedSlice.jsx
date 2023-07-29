import { createSlice } from '@reduxjs/toolkit'

const isConnectedSlice = createSlice({
    name: 'isConnected',
    initialState: {
        value: false,
    },
    reducers: {
        connect(state) {
            state.value = true;
        },
        disconnect(state) {
            state.value = false;
        },
    },
});

export default isConnectedSlice;
export const { connect, disconnect } = isConnectedSlice.actions;