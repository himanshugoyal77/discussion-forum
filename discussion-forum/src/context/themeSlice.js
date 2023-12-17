import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDark: false,
};

export const ThemeSlice = createSlice({
  name: "switchTheme",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isDark = !state.isDark;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggle } = ThemeSlice.actions;

export default ThemeSlice.reducer;
