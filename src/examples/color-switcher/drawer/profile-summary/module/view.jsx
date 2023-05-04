import { useEffect } from "react";
import { useStore } from "../../../../../tyca/react/useStore";

export default function ProfileSummary() {
  const [state, dispatch] = useStore();

  useEffect(() => {
    dispatch.onModuleInit();
  }, []);

  return (
    <div>
      {state.isLoading ? <div>Loading...</div> : <div>{state.name}</div>}
    </div>
  );
}
