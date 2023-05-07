import { createModule } from "@/tyca/react/createModule";
import store from "./store";
import { ColorDropDown } from "./view";

export const ColorDropDownModule = createModule({
  View: ColorDropDown,
  defaultStore: store,
});
