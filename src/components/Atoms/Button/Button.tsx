import style from "./Button.module.scss";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "dark";
  size?: "fat" | "slim" | "medium";
  icon?: string;
}

function Button(props: ButtonProps) {
  const {
    label,
    onClick,
    disabled,
    variant = "primary",
    size = "fat",
    icon,
  } = props;
  return (
    <button
      disabled={disabled}
      className={`${style.button} ${style[variant]} ${style[size]}`}
      onClick={onClick}
    >
      {label}
      <img src={icon} alt="" className={style.icon}></img>
    </button>
  );
}

export default Button;
