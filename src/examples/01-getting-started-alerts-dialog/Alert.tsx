import { Action } from "./logic";

type DialogProps = {
  onDismiss: () => void;
  state?: Readonly<{
    title: string;
    message?: string;
    actions?: { action: Action; label: string }[];
  } | null>;
  dispatch: (action: Action) => void;
};

export default function Dialog({ onDismiss, dispatch, state }: DialogProps) {
  if (!state) return null;
  return (
    state && (
      <div>
        Dialog <button onClick={onDismiss}>Dismiss</button>
        <div>{state.title}</div>
        {state.message && <div>{state.message}</div>}
        {(state.actions ?? []).map(({ action, label }) => {
          return (
            <button key={label} onClick={() => dispatch(action)}>
              {label}
            </button>
          );
        })}
      </div>
    )
  );
}
