import style from "./Button.module.scss";

interface ButtonProps {
  label: string;
  onClick?: () => void; //void perchè questa funzione non ritorna niente,
  // opzionale perche se no lo vuole subito
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
