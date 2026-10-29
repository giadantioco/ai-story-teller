import Head from "next/head";
import Header from "@/components/Molecules/Header/Header";
import style from "@/styles/Login.module.scss";
import { useState } from "react";
import type { GetStaticPropsContext } from "next";
import InputBox from "@/components/Molecules/InputBox/InputBox";
import Button from "@/components/Atoms/Button/Button";
import { useTranslations, useLocale } from "next-intl";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/Molecules/Footer/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const tLogin = useTranslations("Login");
  const locale = useLocale();

  const handleLogin = async () => {
    setLoginError(null);
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${window.location.origin}/${locale}`,
      },
    });
    if (error) {
      console.error("Errore:", error);
      setLoginError(error.status === 429 ? "errRateLimit" : "errLogin");
    } else {
      setSent(true);
    }
  };

  return (
    <>
      <Head>
        <title>{tLogin("headTitle")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>
        <Header logoTitle={"Storyteller"} />
        <div className={style.content}>
          <h1>{tLogin("title")}</h1>
          <div className={style.emailContainer}>
            {sent ? (
              <>
                <p className={style.sent} role="status">
                  {tLogin("checkEmail", { email })}
                </p>
                <Button
                  label={tLogin("changeEmail")}
                  onClick={() => setSent(false)}
                />
              </>
            ) : (
              <>
                <InputBox
                  setValue={setEmail}
                  value={email}
                  label={tLogin("emailTitle")}
                />

                <Button
                  label={tLogin("btnLogin")}
                  onClick={handleLogin}
                  icon={"/arrow.svg"}
                  size={"slim"}
                />
                {loginError && (
                  <p className={style.error} role="alert">
                    {tLogin(loginError)}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const locale = context.locale ?? "en";
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    props: {
      messages,
    },
  };
}
