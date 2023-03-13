import { DispatchAction } from "../../core/dispatchAction";
import ReducerProtocol from "../../core/ReducerProtocol";

type State = {
  count: number;
  numberFactAlert: string | null;
};

type Action =
  | DispatchAction<"factAlertDismissed">
  | DispatchAction<"decrementButtonTapped">
  | DispatchAction<"incrementButtonTapped">
  | DispatchAction<"numberFactButtonTapped">
  | DispatchAction<"numberFactResponse:success", string>
  | DispatchAction<"numberFactResponse:failed">;

class Feature extends ReducerProtocol<State, Action> {
  constructor(private readonly numberFact: () => Promise<string>) {
    super();
  }

  initialState = {
    count: 0,
    numberFactAlert: null,
  };
  reducer = (state: State, action: Action) => {
    switch (action.tag) {
      case "factAlertDismissed": {
        state.numberFactAlert = null;
        return;
      }
      case "decrementButtonTapped": {
        state.count -= 1;
        return;
      }
      case "incrementButtonTapped": {
        state.count += 1;
        return;
      }
      case "numberFactButtonTapped": {
        return async () => {
          try {
            const res = await this.numberFact();
            return { tag: "numberFactResponse:success", payload: res };
          } catch (e) {
            console.error(e);
            return { tag: "numberFactResponse:failed" };
          }
        };
      }
      case "numberFactResponse:success": {
        state.numberFactAlert = action.payload as string;
        return;
      }
      case "numberFactResponse:failed": {
        state.numberFactAlert = "Could not load a number fact :(";
        return;
      }
      default: {
        console.log("action: ", action);
        throw new Error("Action not found");
      }
    }
  };
}

export default Feature;
