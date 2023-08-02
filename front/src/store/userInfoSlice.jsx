import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        value: {
            infos: {
                userNickname: '',
                userId: '',
                userKitList: [],
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
        refreshUserKitList(state, action) {
            state.value.infos.userKitList = action.payload
        }, 
    },
});

export default userInfoSlice;
export const { refreshUserId, refreshUserNickname, refreshUserKitList } = userInfoSlice.actions;