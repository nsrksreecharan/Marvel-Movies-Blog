import { createSlice } from "@reduxjs/toolkit";

const initialUser={
    username:"",
    profileImage:"",
    accessToken:"",
    isProfilePic:false,
    theme:"dark",
    nav:false,
}
const userReducers=createSlice({
    name:"user",
    initialState:{...initialUser},
    reducers:{
        addUser:(state,action)=>{
            const {name="",profileUrl="",email}=action.payload;
            state={
                ...initialUser,
                username:name,
                profileUrl,
                email,
            };
        },
        toggleTheme:(state,action)=>{
            debugger
            const {theme="dark"}=action.payload;
            state.theme=theme;
        },
        toggleNav:(state,action)=>{
            state.nav=action.payload;
        },
        deleteUser:(state,action)=>{
            state=initialUser;
        }
    }
});

export const {addUser,deleteUser,toggleTheme,toggleNav}=userReducers.actions;
export default userReducers.reducer;