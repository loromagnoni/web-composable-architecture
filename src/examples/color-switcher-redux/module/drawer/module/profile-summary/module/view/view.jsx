import { useEnvironment } from "@/tyca/react/useEnvironment";
import { useReduxStore } from "@/tyca/redux/useReduxStore";
import { useEffect } from "react";
import ProfileCard from "./ProfileCard";

export default function ProfileSummary() {
  const { state, dispatch } = useReduxStore();
  const { UI } = useEnvironment();

  useEffect(() => {
    dispatch.onModuleInit();
  }, []);

  return (
    <div>
      {state.isLoading || !state.user ? <UI.LoadingSpinner /> : <ProfileCard />}
    </div>
  );
}
