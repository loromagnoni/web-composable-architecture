import { createModule } from "../../tyca/module";

export const logic = createModule({
  initialState: () => ({
    count: 0,
  }),
  action: ["incrementButtonTapped", "decrementButtonTapped"] as const,
  reducer: () => (state, action) => {
    switch (action) {
      case "incrementButtonTapped":
        state.count += 1;
        return;
      case "decrementButtonTapped":
        state.count -= 1;
        return;
    }
  },
});
