import { StoreOf } from "../../tyca/react/useStore";
import Dialog from "./Alert";
import { logic } from "./logic";

type ViewProps = {
  store: StoreOf<typeof logic>;
};

export default function View({ store }: ViewProps) {
  const [state, dispatch] = store;
  return (
    <div>
      {state.count}
      <button onClick={() => dispatch("alertButtonTapped")}>Alert</button>
      <button onClick={() => dispatch("confirmationDialogButtonTapped")}>
        Dialog
      </button>
      <Dialog
        onDismiss={() => dispatch("alertDismissed")}
        state={state.alert}
        dispatch={dispatch}
      />
      <Dialog
        onDismiss={() => dispatch("confirmationDialogDismissed")}
        state={state.confirmationDialog}
        dispatch={dispatch}
      />
    </div>
  );
}
