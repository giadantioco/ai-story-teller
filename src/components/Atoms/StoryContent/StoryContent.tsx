import style from "./StoryContent.module.scss";
import type { Story } from "@/hooks/useStories";

export interface StoryContentProps {
  story: Story;
}

export function StoryContent(props: StoryContentProps) {
  const { story } = props;

  return (
    <div className={style.container}>
      <h3>{story.title}</h3>
      <p>{story.content}</p>
    </div>
  );
}
