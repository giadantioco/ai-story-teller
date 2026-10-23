import style from "./Input.module.scss";

interface InputProps {
  id?: string;
  value: string;
  setValue: (value: string) => void;
}

function Input(props: InputProps) {
  const { id, value, setValue } = props;
  return (
    <input
      id={id}
      className={style.input}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type="text"
    ></input>
  );
}

export default Input;
