import style from "./StoryCard.module.scss";
import type { Story } from "@/hooks/useStories";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useFormatter } from "next-intl";

export interface StoryCardProps {
  story: Story;
}

export function StoryCard(props: StoryCardProps) {
  const { story } = props;
  const [isOpen, setIsOpen] = useState(false);
  const tAge = useTranslations("Ages");
  const tTheme = useTranslations("Themes");
  const format = useFormatter();

  return (
    <article className={style.card}>
      <div className={style.top}>
        <ul className={style.tags}>
          <li>{tTheme(story.theme)}</li>
          <li>{tAge(story.age_range)}</li>
        </ul>
        <time datetime={story.created_at}>
          {format.dateTime(new Date(story.created_at), {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </time>
      </div>

      <h2>{story.title}</h2>
      {/* età · tema · data */}
      <button onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        {isOpen ? "Chiudi" : "Espandi"}
      </button>
      {isOpen && <p>{story.content}</p>}
    </article>
  );
}
