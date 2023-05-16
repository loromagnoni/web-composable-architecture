import { createModule } from "@/tyca/react/createModule";
import store from "./store";
import ProfileSummary from "./view/view";

export default createModule({
  View: ProfileSummary,
  defaultStore: store,
});
