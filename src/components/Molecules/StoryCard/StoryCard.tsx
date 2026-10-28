import style from "./StoryCard.module.scss";
import type { Story } from "@/hooks/useStories";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useFormatter } from "next-intl";
import Button from "@/components/Atoms/Button/Button";

export interface StoryCardProps {
  story: Story;
}

export function StoryCard(props: StoryCardProps) {
  const { story } = props;
  const [isOpen, setIsOpen] = useState(false);
  const tAge = useTranslations("Ages");
  const tTheme = useTranslations("Themes");
  const tCard = useTranslations("Card");
  const format = useFormatter();

  return (
    <article className={style.card}>
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

      <h2>{story.title}</h2>
      <div className={style.buttons}>
        <Button
          label={!isOpen ? tCard("btnOpen") : tCard("btnClose")}
          onClick={() => setIsOpen(!isOpen)}
          icon={"/open.svg"}
          size={"slim"}
        />

        <Button
          label={tCard("btnDelete")}
          onClick={() => setIsOpen(!isOpen)}
          variant={"dark"}
          icon={"/delete.svg"}
          size={"slim"}
        />

        {isOpen && <p>{story.content}</p>}
      </div>
    </article>
  );
}
