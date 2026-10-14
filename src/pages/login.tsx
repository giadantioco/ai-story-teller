import Head from "next/head";
import Header from "@/components/Molecules/Header/Header";
import style from "@/styles/Login.module.scss";
import { useState } from "react";
import type { GetStaticPropsContext } from "next";
import InputBox from "@/components/Molecules/InputBox/InputBox";
import Button from "@/components/Atoms/Button/Button";
import { useTranslations } from "next-intl";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const tLogin = useTranslations("Login");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
    });
    if (error) {
      setLoginError(true);
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
        <Header title={"Storyteller"} />
        <div className={style.content}>
          {sent ? (
            <>
              <p>{tLogin("checkEmail")}</p>
              <Button
                label={tLogin("changeEmail")}
                onClick={() => setSent(false)}
              />
            </>
          ) : (
            <div className={style.container}>
              <InputBox
                setValue={setEmail}
                label={tLogin("email")}
                value={email}
              />
              <Button label={tLogin("btnLogin")} onClick={handleLogin} />
              {loginError && <p>{tLogin("errLogin")}</p>}
            </div>
          )}
        </div>
      </main>
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
