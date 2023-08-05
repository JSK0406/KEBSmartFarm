import { createSlice } from '@reduxjs/toolkit'

const isRegisteredSlice = createSlice({
    name: 'isRegistered',
    initialState: {
        value: false,
    },
    reducers: {
        register(state) {
            state.value = true;
        },
        deregister(state) {
            state.value = false;
        },
    },
});

export default isRegisteredSlice;
export const { register, deregister } = isRegisteredSlice.actions;