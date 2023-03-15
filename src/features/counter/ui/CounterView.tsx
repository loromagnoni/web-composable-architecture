type CounterViewProps = {
  store: any;
};

export const CounterView = ({ store }: CounterViewProps) => {
  const [state, dispatch] = store;

  if (!state.hasLoadedPokemonList) {
    return <p style={{ padding: 20 }}>Loading pokemon list</p>;
  }

  return (
    <div className="App" style={{ flex: "50%", height: "100vh" }}>
      <h1>Pokemon loader</h1>
      <div className="card">
        <p>You are showing {state.managed.counter} pokemon</p>
        <button onClick={() => dispatch({ type: "INCREMENT" })}>
          Increment
        </button>
        <button onClick={() => dispatch({ type: "DECREMENT" })}>
          Decrement
        </button>
      </div>
    </div>
  );
};
