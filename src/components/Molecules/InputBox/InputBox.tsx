import Input from "@/components/Atoms/Input/Input";
import style from "./InputBox.module.scss";

interface InputBoxProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
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
