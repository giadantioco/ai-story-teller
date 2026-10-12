import style from "./Button.module.scss";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

function Button(props: ButtonProps) {
  const { label, onClick, disabled } = props;
  return (
    <button disabled={disabled} className={style.button} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
