import type { Story } from "@/hooks/useStories";
import style from "./StoriesSection.module.scss";
import { StoryCard } from "@/components/Molecules/StoryCard/StoryCard";
import { StoryModal } from "@/components/Molecules/StoryModal/StoryModal";
import { useTranslations } from "next-intl";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";

export interface StoriesSectionProps {
  stories: Story[];
  onDelete: (id: string) => void;
}

export function StoriesSection(props: StoriesSectionProps) {
  const { stories, onDelete } = props;
  const user = useUser();
  const tStores = useTranslations("Stories");
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  return (
    <section className={style.wrapper}>
      {user ? (
        <>
          {/* <h2 className={style.title}>{tStores("title")}</h2> */}
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              onDelete={onDelete}
              onOpen={setSelectedStory}
            />
          ))}
          <StoryModal
            story={selectedStory}
            onClose={() => setSelectedStory(null)}
            onDelete={(id) => {
              {
                onDelete(id);
              }
              setSelectedStory(null);
            }}
          />
        </>
      ) : (
        <h2 className={style.login}>{tStores("logToSeeStories")}</h2>
      )}
    </section>
  );
}
