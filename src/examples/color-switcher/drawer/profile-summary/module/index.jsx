import { createModule } from "../../../../../tyca/react/createModule";
import store from "./store";
import ProfileSummary from "./view";

export const ProfileSummaryModule = createModule({
  View: ProfileSummary,
  store,
});
