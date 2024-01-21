import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      title: 'nffe',
      descr: 'feret'
    }
  ],
  openBlockIndex: null,
}

export const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    openBlock: (state, action) => {
      state.openBlockIndex = action.payload;
    },
    setQuestion: (state, action) => {
      state.data[state.openBlockIndex].question = action.payload;
    },
    setAnswer: (state, action) => {
      state.data[state.openBlockIndex].answer = action.payload;
    },
    pushQuestion: (state, action) => {
      state.data.push(action.payload);
    },
    setData: (state, action) => {
      state.data = action.payload;
    }
  }
})

export const {openBlock, setQuestion, setAnswer, pushQuestion, setData} = questionSlice.actions;
export default questionSlice.reducer;