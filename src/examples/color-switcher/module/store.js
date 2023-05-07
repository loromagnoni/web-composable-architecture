import { createStore } from "@/tyca/module";
import drawer from "./drawer/module/store";

export default createStore(() => ({
  compose: {
    drawer,
  },
}));
