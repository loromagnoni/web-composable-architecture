import { createReduxModule } from "@/tyca/redux/createReduxModule";
import store from "./store";
import { ColorDropDown } from "./view";

export const ColorDropDownModule = createReduxModule({
  View: ColorDropDown,
  defaultSlice: store,
});
