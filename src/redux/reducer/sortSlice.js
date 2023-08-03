import { createSlice } from "@reduxjs/toolkit";

const sortSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    sortby: (state, action) => {
      return (state = action.payload);
    },
  },
});
export const { sortby } = sortSlice.actions;
export default sortSlice.reducer;
