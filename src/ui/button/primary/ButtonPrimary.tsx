import style from "./style.module.css";

interface ButtonPrimaryProps {
  label: string;
  onClick: () => void;
}

export default function ButtonPrimary({ label, onClick }: ButtonPrimaryProps) {
  return (
    <div onClick={onClick} className={style.button}>
      {label}
    </div>
  );
}
