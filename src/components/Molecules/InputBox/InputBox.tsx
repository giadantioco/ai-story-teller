import Input from "@/components/Atoms/Input/Input";
import style from "./InputBox.module.scss";
import { useId } from "react";

interface InputBoxProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
}

function InputBox(props: InputBoxProps) {
  const { label, value, setValue } = props;
  const id = useId();

  return (
    <div className={style.main}>
      <label htmlFor={id}>{label}</label>
      <Input id={id} value={value} setValue={setValue}></Input>
    </div>
  );
}

export default InputBox;
