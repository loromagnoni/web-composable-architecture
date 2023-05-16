import IconArrow from "../icons/IconArrow";
import IconTick from "../icons/IconTick";
import style from "./style.module.css";

interface DropdownProps {
  options: string[];
  selected: string;
  isOpen: boolean;
  onClick: () => void;
  onOptionClick: (s: string) => void;
}

export default function Dropdown({
  options,
  selected,
  isOpen,
  onClick,
  onOptionClick,
}: DropdownProps) {
  return (
    <div className={style["dropdown-container"]}>
      <div className={style.dropdown} onClick={onClick}>
        <div>{selected}</div>
        <IconArrow className={isOpen ? style["rotate-icon"] : ""} />
      </div>
      {isOpen && (
        <div className={style["dropdown-options"]}>
          {options.map((option) => (
            <div
              key={option}
              className={style["dropdown-option"].concat(
                " ",
                option === selected ? style["dropdown-option-selected"] : ""
              )}
              onClick={() => onOptionClick(option)}
            >
              <div>{option}</div>
              {option === selected && <IconTick />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
