import { createModule } from "@/tyca/react/createModule";
import store from "./store";
import ColorSwitcher from "./view";

export default createModule({
  View: ColorSwitcher,
  defaultStore: store,
});
