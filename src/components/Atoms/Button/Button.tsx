import style from "./Button.module.scss";

interface ButtonProps {
  label: string;
  onClick?: () => void; //void perchè questa funzione non ritorna niente,
  // opzionale perche se no lo vuole subito
}

function Button(props: ButtonProps) {
  const { label, onClick } = props;
  return (
    <button className={style.button} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
