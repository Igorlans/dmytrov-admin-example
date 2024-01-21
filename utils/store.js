import passwordSlice from "@/features/passwordSlice";
import questionSlice from "@/features/questionSlice";
import serviceSlice from "@/features/serviceSlice";
import tariffSlice from "@/features/tariffSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    tariff: tariffSlice,
    questions: questionSlice,
    service: serviceSlice,
    password: passwordSlice
  },
});

export default store;
