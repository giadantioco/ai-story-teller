import style from "./WindowBox.module.scss";

interface WindowProp {
  title?: string;
}

function WindowBox(props: WindowProp) {
  const { title } = props;
  return <div className={style.window}>{title && <h2>{title}</h2>}</div>;
}

export default WindowBox;
