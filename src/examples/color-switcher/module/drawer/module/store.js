import { createStore } from "@/tyca/module";
import colorDropdown from "./color-dropdown/module/store";
import profileSummary from "./profile-summary/module/store";

export default createStore(() => ({
  state: {
    isOpen: false,
  },
  reducer: {
    didTapOpenButton: (state) => {
      state.isOpen = true;
    },
    didTapCloseButton: (state) => {
      state.isOpen = false;
    },
  },
  compose: {
    colorDropdown,
    profileSummary,
  },
}));
