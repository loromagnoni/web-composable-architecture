import style from "./style.module.css";

interface TextCaptionProps {
  content: string;
}

export default function TextLabel({ content }: TextCaptionProps) {
  return <div className={style.label}>{content}</div>;
}
