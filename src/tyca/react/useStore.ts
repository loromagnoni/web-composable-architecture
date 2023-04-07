import { useImmer } from "use-immer";

type Props = {
  initialState: any;
  reducer: any;
};

export default function useStore({ initialState, reducer }: Props) {
  const [state, setState] = useImmer(initialState);
  const dispatch = (action: any) => {
    setState((draft: any) => {
      reducer(draft, action);
    });
  };
  return [state, dispatch] as const;
}
