import Button from "@/components/Atoms/Button/Button";
import Switch from "@/components/Atoms/Switch/Switch";
import style from "./Header.module.scss";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface HeaderProps {
  logo: string;
}

function Header(props: HeaderProps) {
  const t = useTranslations("Header");
  const user = useUser();

  const { logo } = props;
  const router = useRouter();
  const currentPage = router.asPath;
  const locale = router.locale;

  const changeLanguage = (isItalian: boolean) => {
    router.push(currentPage, currentPage, { locale: isItalian ? "it" : "en" });
  };

  const goToLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    supabase.auth.signOut();
  };

  return (
    <div className={style.main}>
      <Link href={"/"} className={style.logo}>
        {logo}
      </Link>
      <div className={style.nav}>
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
          <>
            <span>{user.email}</span>
            <Button label={t("logout")} onClick={handleLogout} />
          </>
        ) : (
          <Button label={t("login")} onClick={goToLogin} />
        )}
      </div>
    </div>
  );
}

export default Header;
