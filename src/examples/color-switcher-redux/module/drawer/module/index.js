import { createReduxModule } from "@/tyca/redux/createReduxModule";
import store from "./store";
import Drawer from "./view";

export default createReduxModule({
  View: Drawer,
  defaultSlice: store,
});
