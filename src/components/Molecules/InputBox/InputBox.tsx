import Input from "@/components/Atoms/Input/Input";
import style from "./InputBox.module.scss";
import { Dispatch, SetStateAction } from "react";

interface InputBoxProps {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

function InputBox(props: InputBoxProps) {
  const { label, value, setValue } = props;
  return (
    <div className={style.main}>
      <h3>{label}</h3>
      <Input value={value} setValue={setValue}></Input>
    </div>
  );
}

export default InputBox;
