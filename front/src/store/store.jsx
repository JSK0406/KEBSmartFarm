import { configureStore } from '@reduxjs/toolkit';
// import isLoginSlice from './isLoginSlice';
import isConnectedSlice from './isConnectedSlice';
import isRegisteredSlice from './isRegistered';
import userInfoSlice from './userInfoSlice';

const store = configureStore({
    reducer: {
        // isLogin: isLoginSlice.reducer,
        isConnected: isConnectedSlice.reducer,
        isRegistered: isRegisteredSlice.reducer,
        userInfo: userInfoSlice.reducer,
    },
});

export default store;