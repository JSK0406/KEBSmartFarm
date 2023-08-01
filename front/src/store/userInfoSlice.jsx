import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie';

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        value: {
            infos: {
                userNickname: '',
                userId: '',
            }
        }
    },
    reducers: {
        refreshUserNickname(state, action) {
            state.value.infos.userNickname = action.payload
        }, 
        refreshUserId(state, action) {
            state.value.infos.userId = action.payload
        }, 
    },
});

export default userInfoSlice;
export const { refreshUserId, refreshUserNickname } = userInfoSlice.actions;