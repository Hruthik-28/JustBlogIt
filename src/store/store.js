import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice"

const store = configureStore({
    reducer: authSliceReducer
})

export default store