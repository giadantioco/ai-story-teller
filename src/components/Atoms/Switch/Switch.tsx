import style from "./Switch.module.scss";

interface SwitchProps {
  active: boolean;
  setActive: (param: boolean) => void;
}

const Switch = (props: SwitchProps) => {
  const { active, setActive } = props;

  return (
    <div
      className={`${style.main} ${active ? style.active : ""}`}
      onClick={() => setActive(!active)}
    >
      <div className={`${style.dot} ${active ? style.active : ""}`} />
    </div>
  );
};

export default Switch;
