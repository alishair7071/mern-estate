
import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    currentUser: null,
    error: null,
    loading: false
}

const userSlice= createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state)=>{
            console.log("start is called");
            state.loading= true
        },
        signInSuccess: (state, action)=>{
            console.log("success is called");

                state.currentUser= action.payload,
                state.loading= false,
                state.error= null
        },
        signInFailure: (state, action)=>{
            console.log("failure is called");

            state.error= action.payload,
            state.loading= false
        }
    }
});

export const {signInStart, signInSuccess, signInFailure} = userSlice.actions;
export default userSlice.reducer;