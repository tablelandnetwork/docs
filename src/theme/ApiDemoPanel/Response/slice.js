import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
export const slice = createSlice({
  name: "response",
  initialState,
  reducers: {
    setResponse: (state, action) => {
      state.value = action.payload;
    },
    clearResponse: (state) => {
      state.value = undefined;
    },
  },
});
export const { setResponse, clearResponse } = slice.actions;
export default slice.reducer;
