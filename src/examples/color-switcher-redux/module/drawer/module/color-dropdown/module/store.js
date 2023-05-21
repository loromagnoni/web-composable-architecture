import { createSlice } from "@reduxjs/toolkit";

export default ({ colors }) =>
  createSlice({
    name: "colorDropdown",
    initialState: {
      isOpen: false,
      selected: colors[0],
    },
    reducers: {
      didTapDropdown: (state) => {
        state.isOpen = !state.isOpen;
      },
      didTapOption: (state, { payload }) => {
        state.selected = colors.find((c) => c.name === payload);
        state.isOpen = false;
      },
    },
  });
