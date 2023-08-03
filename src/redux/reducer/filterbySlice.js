import { createSlice } from "@reduxjs/toolkit";

const filterbySlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterby: (state, action) => {
      return (state = action.payload);
    },
  },
});
export const { filterby } = filterbySlice.actions;
export default filterbySlice.reducer;
