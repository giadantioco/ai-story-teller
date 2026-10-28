import type { Story } from "@/hooks/useStories";
import style from "./StoriesSection.module.scss";
import { StoryCard } from "@/components/Molecules/StoryCard/StoryCard";
import { useTranslations } from "next-intl";
import { useUser } from "@/hooks/useUser";

export interface StoriesSectionProps {
  stories: Story[];
}

export function StoriesSection(props: StoriesSectionProps) {
  const { stories } = props;
  const user = useUser();
  const tStores = useTranslations("Stories");

  return (
    <section className={style.wrapper}>
      {user ? (
        <>
          {/* <h2 className={style.title}>{tStores("title")}</h2> */}
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </>
      ) : (
        <h2 className={style.login}>{tStores("logToSeeStories")}</h2>
      )}
    </section>
  );
}
