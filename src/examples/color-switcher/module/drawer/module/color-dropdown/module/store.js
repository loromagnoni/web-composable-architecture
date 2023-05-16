import { createStore } from "@/tyca/module";

export default createStore(({ colors, UI }) => ({
  state: {
    isOpen: false,
    selected: colors[0],
  },
  reducer: {
    didTapDropdown: (state) => {
      state.isOpen = !state.isOpen;
    },
    didTapOption: (state, color) => {
      state.selected = colors.find((c) => c.name === color);
      state.isOpen = false;
    },
  },
}));
