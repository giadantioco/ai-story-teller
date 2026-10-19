import type { Story } from "@/hooks/useStories";
import style from "./StoriesSection.module.scss";
import { StoryCard } from "@/components/Molecules/StoryCard/StoryCard";
import { useTranslations } from "next-intl";

export interface StoriesSectionProps {
  stories: Story[];
}

export function StoriesSection(props: StoriesSectionProps) {
  const { stories } = props;
  const tStores = useTranslations("Stories");

  return (
    <section>
      <h2>{tStores("title")}</h2>
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </section>
  );
}
