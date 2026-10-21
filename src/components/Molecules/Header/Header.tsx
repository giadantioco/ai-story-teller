import Button from "@/components/Atoms/Button/Button";
import Switch from "@/components/Atoms/Switch/Switch";
import style from "./Header.module.scss";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useGoToLogin } from "@/hooks/useGoToLogin";

interface HeaderProps {
  logoTitle: string;
}

function Header(props: HeaderProps) {
  const t = useTranslations("Header");
  const user = useUser();
  const goToLogin = useGoToLogin();

  const { logoTitle } = props;
  const router = useRouter();
  const currentPage = router.asPath;
  const locale = router.locale;

  const changeLanguage = (isItalian: boolean) => {
    router.push(currentPage, currentPage, { locale: isItalian ? "it" : "en" });
  };

  const handleLogout = () => {
    supabase.auth.signOut();
  };

  return (
    <header className={style.main}>
      <Link href={"/"} className={style.logoContainer}>
        <img src={"/logos.svg"} className={style.logoImg} alt={"logo-image"} />
        <span className={style.logoTitle}>{logoTitle}</span>
      </Link>
      <nav className={style.nav}>
        <div className={style.switch}>
          <span
            className={locale === "en" ? style.activeLang : ""}
            aria-hidden="true"
          >
            EN
          </span>
          <Switch
            label={t("languageSwitch")}
            active={locale === "it"}
            setActive={changeLanguage}
          />
          <span
            className={locale === "it" ? style.activeLang : ""}
            aria-hidden="true"
          >
            IT
          </span>
        </div>

        {user ? (
          <Button label={t("logout")} onClick={handleLogout} />
        ) : (
          <Button label={t("login")} onClick={goToLogin} />
        )}
      </nav>
    </header>
  );
}

export default Header;
