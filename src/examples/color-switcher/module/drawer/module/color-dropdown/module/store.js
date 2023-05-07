import { createStore } from "@/tyca/module";

export default createStore(({ colors }) => ({
  state: {
    isOpen: false,
    selected: colors[0],
  },
  reducer: {
    didTapDropdown: (state) => {
      state.isOpen = !state.isOpen;
    },
    didTapOption: (state, color) => {
      state.selected = color;
      state.isOpen = false;
    },
  },
}));
