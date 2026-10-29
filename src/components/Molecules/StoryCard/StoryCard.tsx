import style from "./StoryCard.module.scss";
import type { Story } from "@/hooks/useStories";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useFormatter } from "next-intl";
import Button from "@/components/Atoms/Button/Button";
import { StoryMeta } from "@/components/Atoms/StoryMeta/StoryMeta";

export interface StoryCardProps {
  story: Story;
  onDelete: (id: string) => void;
  onOpen: (story: Story) => void;
}

export function StoryCard(props: StoryCardProps) {
  const { story, onDelete, onOpen } = props;
  const [isOpen, setIsOpen] = useState(false);
  const tAge = useTranslations("Ages");
  const tTheme = useTranslations("Themes");
  const tCard = useTranslations("Card");

  return (
    <article className={style.card}>
      <StoryMeta story={story} />
      <h2>{story.title}</h2>
      <div className={style.actions}>
        <Button
          label={!isOpen ? tCard("btnOpen") : tCard("btnClose")}
          onClick={() => onOpen(story)}
          icon={"/open.svg"}
          size={"slim"}
        />

        <Button
          label={tCard("btnDelete")}
          onClick={() => onDelete(story.id)}
          variant={"dark"}
          icon={"/delete.svg"}
          size={"slim"}
        />
      </div>
      {isOpen && <p>{story.content}</p>}
    </article>
  );
}
