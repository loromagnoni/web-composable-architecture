import style from "./style.module.css";

interface AvatarProps {
  src: string;
}

export default function Avatar({ src }: AvatarProps) {
  return <img className={style.avatar} src={src} alt="avatar" />;
}
