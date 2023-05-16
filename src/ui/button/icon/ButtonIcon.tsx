import style from "./style.module.css";

interface ButtonIconProps {
  Icon: React.FC;
  onClick: () => void;
  className?: string;
}

export default function ButtonIcon({
  Icon,
  onClick,
  className = "",
}: ButtonIconProps) {
  return (
    <div onClick={onClick} className={[style.button, className].join(" ")}>
      <Icon />
    </div>
  );
}
