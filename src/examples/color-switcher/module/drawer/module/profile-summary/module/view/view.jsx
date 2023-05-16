import { useEffect } from "react";
import { useStore } from "@/tyca/react/useStore";
import ProfileCard from "./ProfileCard";
import { useEnvironment } from "@/tyca/react/useEnvironment";

export default function ProfileSummary() {
  const { state, dispatch } = useStore();
  const { UI } = useEnvironment();

  useEffect(() => {
    dispatch.onModuleInit();
  }, []);

  return <div>{state.isLoading ? <UI.LoadingSpinner /> : <ProfileCard />}</div>;
}
