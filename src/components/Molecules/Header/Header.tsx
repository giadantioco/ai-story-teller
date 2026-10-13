import Button from "@/components/Atoms/Button/Button";
import Switch from "@/components/Atoms/Switch/Switch";
import style from "./Header.module.scss";
import { useRouter } from "next/router";

interface HeaderProps {
  title: string;
}

function Header(props: HeaderProps) {
  const { title } = props;
  const router = useRouter();
  const currentPage = router.asPath;
  const locale = router.locale;

  const changeLanguage = (isItalian: boolean) => {
    router.push(currentPage, currentPage, { locale: isItalian ? "it" : "en" });
  };

  return (
    <div className={style.main}>
      <h1>{title}</h1>
      <div className={style.nav}>
        <div className={style.switch}>
          <span>EN</span>
          <Switch active={locale === "it"} setActive={changeLanguage} />
          <span>IT</span>
        </div>
        <Button label="Login" />
      </div>
    </div>
  );
}

export default Header;
