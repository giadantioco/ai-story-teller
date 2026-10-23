import style from "./Button.module.scss";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "dark";
  icon?: string;
}

function Button(props: ButtonProps) {
  const { label, onClick, disabled, variant = "primary", icon } = props;
  return (
    <button
      disabled={disabled}
      className={`${style.button} ${style[variant]}`}
      onClick={onClick}
    >
      {label}
      <img src={icon} alt="" className={style.icon}></img>
    </button>
  );
}

export default Button;
