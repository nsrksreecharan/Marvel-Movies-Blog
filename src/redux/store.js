import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./reducers/userReducers";
import { apiSlice } from "./apiSlice";
import { userApiSlice } from "./userApiSlice";
const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        [userApiSlice.reducerPath]:userApiSlice.reducer,
        user:userReducers
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSlice.middleware).concat(userApiSlice.middleware)
});

export default store;