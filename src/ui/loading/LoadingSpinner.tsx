import style from "./style.module.css";

export default function LoadingSpinner() {
  return (
    <div className={style.spinner}>
      <div></div>
      <div></div>
    </div>
  );
}
