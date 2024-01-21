import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: []
}

export const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    setNewPassword: (state, action) => {
      state.user = action.payload;
    }
  }
})

export const {setNewPassword} = passwordSlice.actions;
export default passwordSlice.reducer;