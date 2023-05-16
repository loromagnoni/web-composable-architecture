import style from "./style.module.css";

interface TextHeadingProps {
  content: string;
  level: 1 | 2 | 3 | 4 | 5;
}

const levelClass = {
  1: style.heading_1,
  2: style.heading_2,
  3: style.heading_3,
  4: style.heading_4,
  5: style.heading_5,
};

export default function TextHeading({ content, level }: TextHeadingProps) {
  return (
    <div className={`${style.heading} ${levelClass[level]}`}>{content}</div>
  );
}
