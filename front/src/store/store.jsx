import { configureStore } from '@reduxjs/toolkit';
import isLoginSlice from './isLoginSlice';
import isConnectedSlice from './isConnectedSlice';
import isRegisteredSlice from './isRegistered';

const store = configureStore({
    reducer: {
        isLogin: isLoginSlice.reducer,
        isConnected: isConnectedSlice.reducer,
        isRegistered: isRegisteredSlice.reducer,
    },
});

export default store;