import { ReactNode } from "react";
import style from "./WindowBox.module.scss";

interface WindowProps {
  title?: string;
  children: ReactNode;
}

function WindowBox(props: WindowProps) {
  const { title, children } = props;
  return (
    <div className={style.main}>
      {title && <h2>{title} </h2>}
      <div className={style.test}>{children}</div>
    </div>
  );
}

export default WindowBox;
