import type { Story } from "@/hooks/useStories";
import style from "./StoriesSection.module.scss";
import { StoryCard } from "@/components/Molecules/StoryCard/StoryCard";

export interface StoriesSectionProps {
    stories: Story[];
}

export function StoriesSection(props: StoriesSectionProps) {
    const { stories } = props;

    return (
        <section>
            <h2>Saved Stories</h2>
            {stories.map((story) => (
                <StoryCard key={story.id} story={story} />
            ))}
        </section>
    );
}