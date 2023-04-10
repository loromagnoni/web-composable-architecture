import { useStore } from "../../tyca/react/useStore";

export default function Counter() {
  const [state, send] = useStore();
  return (
    <div>
      <button onClick={send.didTapIncrementButton}>Increment</button>
      {state.count}
      <button onClick={send.didTapDecrementButton}>Decrement</button>
    </div>
  );
}
