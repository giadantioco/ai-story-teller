import SelectBox from "@/components/Molecules/SelectBox/SelectBox";
import InputBox from "@/components/Molecules/InputBox/InputBox";
import Button from "@/components/Atoms/Button/Button";
import style from "./StoryForm.module.scss";
import { ageList, themeList } from "@/constants/common";
import { useTranslations } from "next-intl";

export interface StoryFormProps {
  age: string;
  theme: string;
  protagonist: string;
  friend: string;
  setAge: (value: string) => void;
  setTheme: (value: string) => void;
  setProtagonist: (value: string) => void;
  setFriend: (value: string) => void;
  loading: boolean;
  onGenerate: () => void;
}

export function StoryForm(props: StoryFormProps) {
  const {
    age,
    theme,
    protagonist,
    friend,
    setAge,
    setTheme,
    setProtagonist,
    setFriend,
    loading,
    onGenerate,
  } = props;
  const tStoryForm = useTranslations("StoryForm");
  const tAge = useTranslations("Ages");
  const tTheme = useTranslations("Themes");

  const translatedAges = ageList.map((item) => ({
    value: item.value,
    label: tAge(item.value),
  }));

  const translatedThemes = themeList.map((item) => ({
    value: item.value,
    label: tTheme(item.value),
  }));

  return (
    <div className={style.container}>
      <div className={style.inner}>
        <p className={style.eyebrow}>{tStoryForm("eyebrown")}</p>
        <div className={style.selectGroup}>
          <SelectBox
            label={tStoryForm("age")}
            list={translatedAges}
            setAction={setAge}
          />
          <SelectBox
            label={tStoryForm("theme")}
            list={translatedThemes}
            setAction={setTheme}
          />
        </div>
        <InputBox
          label={tStoryForm("protagonist")}
          value={protagonist}
          setValue={setProtagonist}
        />
        <InputBox
          label={tStoryForm("friend")}
          value={friend}
          setValue={setFriend}
        />
        <Button
          label={loading ? tStoryForm("loading") : tStoryForm("generate")}
          onClick={onGenerate}
          disabled={
            age.trim().length <= 0 ||
            theme.trim().length <= 0 ||
            protagonist.trim().length <= 0 ||
            loading
          }
        />
      </div>
    </div>
  );
}
