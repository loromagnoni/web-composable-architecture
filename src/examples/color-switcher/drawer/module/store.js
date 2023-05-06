import { createStore } from "@/tyca/module";
import colorDropdown from "./color-dropdown/module/store";
import profileSummary from "./profile-summary/module/store";

export default createStore(() => ({
  state: {
    isOpen: false,
  },
  reducer: {
    didTapIcon: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
  compose: {
    colorDropdown,
    profileSummary,
  },
}));
