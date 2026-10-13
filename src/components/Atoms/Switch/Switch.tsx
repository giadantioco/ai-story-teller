import style from "./Switch.module.scss";

interface SwitchProps {
  active: boolean;
  setActive: (param: boolean) => void;
  label: string;
}

const Switch = (props: SwitchProps) => {
  const { active, setActive, label } = props;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      aria-label={label}
      className={`${style.main} ${active ? style.active : ""}`}
      onClick={() => setActive(!active)}
    >
      <div className={`${style.dot} ${active ? style.active : ""}`} />
    </button>
  );
};

export default Switch;
