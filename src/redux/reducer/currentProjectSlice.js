import { createSlice } from "@reduxjs/toolkit";

const currentProjectSlice = createSlice({
  name: "currentProject",
  initialState: {},
  reducers: {
    setCurrentProject: (state, action) => {
      return (state = action.payload);
    },
  },
});
export const { setCurrentProject } = currentProjectSlice.actions;
export default currentProjectSlice.reducer;
