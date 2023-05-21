import { combineReducers, createSlice } from "@reduxjs/toolkit";
import colorDropdown from "./color-dropdown/module/store";
import profileSummary from "./profile-summary/module/store";

interface Environment {
  colors: { name: string; value: string }[];
  userRepository: {
    getUser: () => Promise<{ name: string; age: number }>;
  };
}

export default ({ colors, userRepository }: Environment) => {
  const colorDropdownSlice = colorDropdown({ colors });
  const profileSummarySlice = profileSummary({ userRepository });
  const root = createSlice({
    name: "root",
    initialState: {
      isOpen: false,
    },
    reducers: {
      didTapOpenButton: (state) => {
        state.isOpen = true;
      },
      didTapCloseButton: (state) => {
        state.isOpen = false;
      },
    },
  });
  const reducer = combineReducers({
    colorDropdown: colorDropdownSlice.reducer,
    profileSummary: profileSummarySlice.reducer,
    root: root.reducer,
  });
  const actions = {
    colorDropdown: colorDropdownSlice.actions,
    profileSummary: profileSummarySlice.actions,
    root: root.actions,
  };
  return { reducer, actions };
};
