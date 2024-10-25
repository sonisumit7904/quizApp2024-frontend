import { createReducer } from "@reduxjs/toolkit";
import { act } from "react";
const initialState = {
  questions: [],
};

const questionReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("get_questions", (state, action) => {
      state.questions = action.payload;
    })
    .addCase("insert_question", (state, action) => {
      state.questions = [...state.questions, action.payload];
    });
});

export default questionReducer;
