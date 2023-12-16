import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

export const sidebarSlice = createSlice({
  name: "toggleSidebar",
  initialState,
  reducers: {
    toggle: (state) => {
      state.open = !state.open;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggle } = sidebarSlice.actions;

export default sidebarSlice.reducer;
