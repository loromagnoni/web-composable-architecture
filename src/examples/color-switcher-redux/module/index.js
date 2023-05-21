import { createReduxModule } from "@/tyca/redux/createReduxModule";
import store from "./drawer/module/store";
import ColorSwitcher from "./view";

export default createReduxModule({
  View: ColorSwitcher,
  defaultSlice: store,
});
