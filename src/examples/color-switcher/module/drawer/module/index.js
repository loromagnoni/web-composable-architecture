import { createModule } from "@/tyca/react/createModule";
import Drawer from "./view";
import store from "./store";

export default createModule({
  View: Drawer,
  defaultStore: store,
});
