type CounterViewProps = {
  store: any;
};

export default function CounterView({ store }: CounterViewProps) {
  const [state, dispatch] = store;
  console.log("render CounterView");
  console.log("store received", store);
  return (
    <div>
      <button onClick={() => dispatch("incrementButtonTapped")}></button>
      {state.count}
      <button onClick={() => dispatch("decrementButtonTapped")}></button>
    </div>
  );
}
