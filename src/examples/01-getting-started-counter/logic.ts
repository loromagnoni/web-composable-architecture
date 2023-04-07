export const logic = {
  initialState: () => ({
    count: 0,
  }),
  action: ["incrementButtonTapped", "decrementButtonTapped"],
  reducer: () => (state: any, action: any) => {
    switch (action) {
      case "incrementButtonTapped":
        state.count += 1;
        return;
      case "decrementButtonTapped":
        state.count -= 1;
        return;
    }
  },
};
