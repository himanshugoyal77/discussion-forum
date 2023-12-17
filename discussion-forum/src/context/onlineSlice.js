import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onlineUsers: [],
};

export const socketSlice = createSlice({
  name: "socketSlice",
  initialState,
  reducers: {
    addUsers(state, action) {
      state.onlineUsers = action.payload;
      console.log("state", state.onlineUsers);
    },
    removeUsers(state, action) {
      console.log("remove", action.payload);
      state.onlineUsers = state.onlineUsers.filter(
        (user) => user._id !== action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUsers, removeUsers } = socketSlice.actions;

export default socketSlice.reducer;
