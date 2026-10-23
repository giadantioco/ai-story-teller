import style from "./StoryResult.module.scss";
import { useUser } from "@/hooks/useUser";
import { useGoToLogin } from "@/hooks/useGoToLogin";
import { useTranslations } from "next-intl";
import Button from "@/components/Atoms/Button/Button";

export interface StoryResultProps {
  age: string;
  theme: string;
  title: string;
  story: string;
  saved: boolean;
  saveError: boolean;
  onSave: () => void;
}

export function StoryResult(props: StoryResultProps) {
  const { age, theme, title, story, saved, saveError, onSave } = props;
  const user = useUser();
  const goToLogin = useGoToLogin();
  const tStoryResult = useTranslations("StoryResult");

  return (
    <div className={style.result}>
      <div className={style.scrollArea}>
        <div className={style.tags}>
          <p>{age}</p>
          <p>{theme}</p>
        </div>
        <h3 className={style.storyTitle}>{title}</h3>
        <p className={style.storyResult}>{story}</p>
        <div className={style.actions}>
          {user ? (
            <>
              <Button
                label={saved ? tStoryResult("saved") : tStoryResult("save")}
                onClick={onSave}
                disabled={saved}
                variant={"dark"}
                icon={"/save.svg"}
              />
              {saveError && <p>{tStoryResult("saveErr")}</p>}
            </>
          ) : (
            <Button label={tStoryResult("loginToSave")} onClick={goToLogin} />
          )}
        </div>
      </div>
    </div>
  );
}
