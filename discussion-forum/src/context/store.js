import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import themeReducer from "./themeSlice";
import onlineReducer from "./onlineSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    theme: themeReducer,
    online: onlineReducer,
  },
});
