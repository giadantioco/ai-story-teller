import style from "./WindowBox.module.scss";

interface WindowProps {
  title?: string;
  // children: ReactNode;
}

function WindowBox(props: WindowProps) {
  const { title } = props;
  return (
    <div className={style.main}>
      {title && <h2>{title} </h2>}
      <div className={style.test}>ciao</div>
    </div>
  );
}

export default WindowBox;
