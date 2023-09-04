import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {},
};

export const filterSearchSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const { updateFilters } = filterSearchSlice.actions;

export const selectFilterSearch = (state) => state.filters;

export default filterSearchSlice.reducer;
