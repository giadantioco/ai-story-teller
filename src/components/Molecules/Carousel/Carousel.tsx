import style from "./Carousel.module.scss";
import Button from "@/components/Atoms/Button/Button";

interface CarouselProps {
  stories: string[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const carousel = (props: CarouselProps) => {
  const { stories, currentIndex, setCurrentIndex } = props;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? stories.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={style.main}>
      <div className={style.carousel}>
        <div className={style.storyCard}>
          <h3> Story {currentIndex + 1}</h3>
          <p>{stories[currentIndex]}</p>
        </div>
      </div>
      <Button label="Previous" onClick={handlePrev} />
      <Button label="Next" onClick={handleNext} />
    </div>
  );
};

export default carousel;
