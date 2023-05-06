import { createModule } from "@/tyca/react/createModule";
import store from "./store";
import ProfileSummary from "./view";

export default createModule({
  View: ProfileSummary,
  defaultStore: store,
});
