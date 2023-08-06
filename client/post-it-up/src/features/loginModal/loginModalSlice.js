import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

export const loginModalSlice = createSlice({
  name: "loginModal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.open = true;
    },
    closeModal: (state) => {
      state.open = false;
    },
  },
});

export const { openModal, closeModal } = loginModalSlice.actions;

export const selectLoginModalStatus = (state) => state.loginModal.open;

export default loginModalSlice.reducer;
