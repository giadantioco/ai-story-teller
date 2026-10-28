import { useEffect, useRef } from "react";
import style from "./StoryModal.module.scss";
import { Story } from "@/hooks/useStories";

export interface StoryModalProps {
  story: Story | null;
  onClose: () => void;
}

export function StoryModal(props: StoryModalProps) {
  const { story, onClose } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);

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
        <>
          <h2>{story.title}</h2>
          <p>{story.content}</p>
          <button onClick={onClose}>X</button>
        </>
      )}
    </dialog>
  );
}
