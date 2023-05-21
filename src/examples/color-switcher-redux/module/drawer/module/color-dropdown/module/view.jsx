import { useEnvironment } from "@/tyca/react/useEnvironment";
import { useReduxStore } from "@/tyca/redux/useReduxStore";

export const ColorDropDown = () => {
  const { state, dispatch } = useReduxStore();
  const environment = useEnvironment();
  const Dropdown = environment.UI.Dropdown;
  return (
    <Dropdown
      onClick={() => dispatch.didTapDropdown()}
      selected={state.selected.name}
      isOpen={state.isOpen}
      options={environment.colors.map((c) => c.name)}
      onOptionClick={(o) => dispatch.didTapOption(o)}
    />
  );
};
