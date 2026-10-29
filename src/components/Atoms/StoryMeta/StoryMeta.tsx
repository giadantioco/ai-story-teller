import style from "./StoryMeta.module.scss";
import type { Story } from "@/hooks/useStories";
import { useTranslations, useFormatter } from "next-intl";

export interface StoryMetaProps {
  story: Story;
}

export function StoryMeta(props: StoryMetaProps) {
  const { story } = props;
  const tAge = useTranslations("Ages");
  const tTheme = useTranslations("Themes");
  const format = useFormatter();

  return (
    <div className={style.top}>
      <ul className={style.tags}>
        <li>{tTheme(story.theme)}</li>
        <li>{tAge(story.age_range)}</li>
      </ul>
      <time dateTime={story.created_at} className={style.tags}>
        {format.dateTime(new Date(story.created_at), {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </time>
    </div>
  );
}
