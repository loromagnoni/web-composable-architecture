import { useEnvironment } from "@/tyca/react/useEnvironment";
import { useStore } from "@/tyca/react/useStore";

export const ColorDropDown = () => {
  const { state, dispatch } = useStore();
  const environment = useEnvironment();
  return (
    <div>
      <button onClick={dispatch.didTapDropdown}>{state.selected.name}</button>
      {state.isOpen && (
        <div>
          {environment.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => dispatch.didTapOption(color)}
            >
              {color.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
