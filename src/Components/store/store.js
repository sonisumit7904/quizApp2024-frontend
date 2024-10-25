import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "../Reducers/QuestionReducer";

const store = configureStore({
  reducer: {
    getQ: questionReducer,
  },
});
export default store;
