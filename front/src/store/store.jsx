import { configureStore } from '@reduxjs/toolkit';
import isLoginSlice from './isLoginSlice';

const store = configureStore({
    reducer: {
        isLogin: isLoginSlice.reducer,
    },
});

export default store;