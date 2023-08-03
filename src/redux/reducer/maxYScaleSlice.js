import { createSlice } from "@reduxjs/toolkit";

const maxYScaleSlice = createSlice({
  name: "maxYScale",
  initialState: 4095,
  reducers: {
    setMax: (state, action) => {
      return (state = action.payload);
    },
  },
});
export const { setMax } = maxYScaleSlice.actions;
export default maxYScaleSlice.reducer;
