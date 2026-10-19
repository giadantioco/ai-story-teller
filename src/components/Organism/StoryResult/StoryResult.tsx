import style from "./StoryResult.module.scss"
import { useUser } from "@/hooks/useUser";
import { useGoToLogin } from "@/hooks/useGoToLogin";
import { useTranslations } from "next-intl";
import Button from "@/components/Atoms/Button/Button";

export interface StoryResultProps {
    title: string;
    story: string;
    saved: boolean;
    saveError: boolean;
    onSave: () => void;
}

export function StoryResult(props: StoryResultProps) {
    const { title, story, saved, saveError, onSave } = props;
    const user = useUser();
    const goToLogin = useGoToLogin();
    const t = useTranslations("Home");

    return (
        <div className={style.result}>
            <h3>{title}</h3>
            <p>{story}</p>
            <div className={style.result}>
                {user ? (
                    <>
                        <Button
                            label={saved ? t("saved") : t("save")}
                            onClick={onSave}
                            disabled={saved}
                        />
                        {saveError && <p>{t("saveErr")}</p>}
                    </>
                ) : (
                    <Button label={t("logToSave")} onClick={goToLogin} />
                )}
            </div>
        </div>
    )
}