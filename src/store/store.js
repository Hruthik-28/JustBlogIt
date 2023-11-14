import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice"

const store = configureStore({
    reducer: {
        auth: authSliceReducer
    }
})

export default store