import { useEnvironment } from "@/tyca/react/useEnvironment";
import { useStore } from "@/tyca/react/useStore";

export const ColorDropDown = () => {
  const { state, dispatch } = useStore();
  const environment = useEnvironment();
  const Dropdown = environment.UI.Dropdown;
  return (
    <Dropdown
      onClick={dispatch.didTapDropdown}
      selected={state.selected.name}
      isOpen={state.isOpen}
      options={environment.colors.map((c) => c.name)}
      onOptionClick={(o) => dispatch.didTapOption(o)}
    />
  );
};
