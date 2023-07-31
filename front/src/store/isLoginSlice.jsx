import { createSlice } from '@reduxjs/toolkit'

const isLoginSlice = createSlice({
    name: 'isLogin',
    initialState: {
        value: false,
    },
    reducers: {
        login(state) {
            state.value = true;
        },
        logout(state) {
            state.value = false;
        },
    },
});

export default isLoginSlice;
export const { login, logout } = isLoginSlice.actions;