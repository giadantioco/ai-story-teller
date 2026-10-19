import style from "./StoryCard.module.scss";
import type { Story } from "@/hooks/useStories";
import { useState } from "react";

export interface StoryCardProps {
    story: Story;
}

export function StoryCard(props: StoryCardProps) {
    const { story } = props;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <article className={style.card}>
            <h2>{story.title}</h2>
            {/* età · tema · data */}
            <button onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
                {isOpen ? "Chiudi" : "Espandi"}
            </button>
            {isOpen && <p>{story.content}</p>}
        </article>
    )
}

