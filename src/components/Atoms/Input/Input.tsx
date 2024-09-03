import { Dispatch, SetStateAction } from "react";
import style from "./Input.module.scss";

interface InputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

function Input(props: InputProps) {
  const { value, setValue } = props;
  //   const [value, setValue] = useState(""); --> lo state va gestito con le props per avere un compontente dinamico
  return (
    // controlled component = componenti gestiti da uno state!
    <input
      className={style.input}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type="text"
    ></input>
  );
}

export default Input;
