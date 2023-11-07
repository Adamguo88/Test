import { configureStore } from "@reduxjs/toolkit";
import AddTemplate from "redux/actions/AddTemplate";
import NewRelease from "redux/actions/NewRelease";
export const store = configureStore({
  reducer: {
    AddTemplate,
    NewRelease,
  },
});
