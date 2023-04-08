import { createModule } from "../../tyca/module";

export type Action = typeof logic.action[number];

type PopupState = Readonly<{
  title: string;
  message?: string;
  actions?: { label: string; action: Action }[];
}>;

export const logic = createModule({
  initialState() {
    return {
      alert: null as PopupState | null,
      confirmationDialog: null as PopupState | null,
      count: 0,
    };
  },
  action: [
    "alertButtonTapped",
    "alertDismissed",
    "confirmationDialogButtonTapped",
    "confirmationDialogDismissed",
    "decrementButtonTapped",
    "incrementButtonTapped",
  ] as const,
  reducer: () => (state, action) => {
    switch (action) {
      case "alertButtonTapped":
        state.alert = {
          title: "Alert!",
          message: "This is an alert",
          actions: [
            { label: "Cancel", action: "alertDismissed" },
            { label: "Increment", action: "incrementButtonTapped" },
          ],
        };
        return;
      case "alertDismissed":
        state.alert = null;
        return;
      case "confirmationDialogButtonTapped":
        state.confirmationDialog = {
          title: "Confirmation dialog",
          message: "This is a confirmation dialog.",
          actions: [
            { label: "Cancel", action: "confirmationDialogDismissed" },
            { label: "Increment", action: "incrementButtonTapped" },
            { label: "Decrement", action: "decrementButtonTapped" },
          ],
        };
        return;
      case "confirmationDialogDismissed":
        state.confirmationDialog = null;
        return;
      case "decrementButtonTapped":
        state.alert = {
          title: "Decremented!",
        };
        state.count--;
        return;
      case "incrementButtonTapped":
        state.alert = {
          title: "Incremented!",
        };
        state.count++;
        return;
    }
  },
});
