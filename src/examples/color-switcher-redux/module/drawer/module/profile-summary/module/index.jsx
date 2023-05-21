import { createReduxModule } from "@/tyca/redux/createReduxModule";
import store from "./store";
import ProfileSummary from "./view/view";

export default createReduxModule({
  View: ProfileSummary,
  defaultSlice: store,
});
