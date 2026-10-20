import style from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={style.container}>
      <span className={style.text} aria-hidden="true">
        Storyteller
      </span>
    </footer>
  );
}
