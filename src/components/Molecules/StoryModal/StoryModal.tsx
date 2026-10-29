import { useEffect, useRef, useTransition } from "react";
import style from "./StoryModal.module.scss";
import { Story } from "@/hooks/useStories";
import { StoryMeta } from "@/components/Atoms/StoryMeta/StoryMeta";
import { StoryContent } from "@/components/Atoms/StoryContent/StoryContent";
import { useTranslations } from "use-intl";
import Button from "@/components/Atoms/Button/Button";

export interface StoryModalProps {
  story: Story | null;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export function StoryModal(props: StoryModalProps) {
  const { story, onClose, onDelete } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const tCard = useTranslations("Card");

  useEffect(() => {
    if (story) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [story]);

  return (
    <dialog ref={dialogRef} onClose={onClose} className={style.modal}>
      {story && (
        <div className={style.container}>
          <button
            onClick={onClose}
            className={style.closeBtn}
            aria-label={"close"}
          >
            x
          </button>
          <StoryMeta story={story} />
          <StoryContent story={story} />
          <Button
            label={tCard("btnDelete")}
            onClick={() => onDelete(story.id)}
            variant={"dark"}
            icon={"/delete.svg"}
            size={"slim"}
          />
        </div>
      )}
    </dialog>
  );
}
