import { Dispatch, SetStateAction } from "react";
import style from "./Input.module.scss";

interface InputProps {
  value: string;
  setValue: (value: string) => void;
}

function Input(props: InputProps) {
  const { value, setValue } = props;
  return (
    <input
      className={style.input}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type="text"
    ></input>
  );
}

export default Input;
