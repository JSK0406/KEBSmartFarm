// import { createSlice } from '@reduxjs/toolkit'
// import { Cookies } from 'react-cookie';
// import { useCookies } from 'react-cookie';

// // token: token자체, tokenName: 내가 get할 token이름

// const cookieSlice = createSlice({
//     name: 'cookie',
//     initialState: {
//         value: {
//             cookie: new Cookies()
//         }
//     },
//     reducers: {
//         setCookie(state, action) {  // 토큰 자체와 토큰 이름을 object 형태로
//             state.value.cookie.set(`${action.payload.tokenName}`, `JWT ${action.payload.token}`, {
//                 path: "/",
//                 sameSite: "strict",
//             })  
//         },
//         getCookie(state, action) {  // 토큰 이름 바로 넣기
//             return state.value.cookie.get(action.payload);
//         },
//         removeCookie(state, action) {  // 토큰 이름 바로 넣기
//             state.value.cookie.remove(action.payload, { path: '/' })
//         }
//     }

// });

// export default cookieSlice;
// export const { setCookie, getCookie, removeCookie } = cookieSlice.actions;