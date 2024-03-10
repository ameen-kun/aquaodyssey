import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    token: "",
    role:"",
    isLoggedin: false
  },
  reducers: {
      loginUser: (state, action) => {
          state.isLoggedin = true;
          state.token = action.payload;
    },
        setRole:(state,action)=>{
            state.role=action.payload
        },
    logoutUser: (state) => {
      state.token="";
      state.role=""
      state.isLoggedin = false;
    }
  },
});

export const { loginUser, logoutUser,setRole } = loginSlice.actions;
export default loginSlice.reducer;