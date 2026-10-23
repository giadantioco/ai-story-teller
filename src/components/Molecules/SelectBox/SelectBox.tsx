import { ListOption } from "@/types/common";
import style from "./SelectBox.module.scss";
import { ChangeEvent, useId } from "react";

interface SelectBoxProps {
  label: string;
  list: ListOption[];
  setAction: (value: string) => void;
}

const SelectBox = (props: SelectBoxProps) => {
  const { label, list, setAction } = props;
  const id = useId();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAction(e.target.value);
  };

  return (
    <div className={style.main}>
      <label htmlFor={id}>{label}</label>
      <select id={id} onChange={handleChange}>
        <option value="" hidden>
          seleziona
        </option>
        {list.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
