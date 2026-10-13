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
  const tEmail = useTranslations("Email");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
    });
    if (error) {
      setLoginError(true);
    } else {
      setSent(sent);
    }
  };

  return (
    <div>
      {sent ? (
        <p>Controlla la tua email </p>
      ) : (
        <>
          <InputBox setValue={setEmail} label={tEmail("email")} value={email} />
          <Button label={tLogin("btnLogin")} onClick={handleLogin} />
        </>
      )}
    </div>
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
