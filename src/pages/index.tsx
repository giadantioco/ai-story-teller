import Head from "next/head";
import style from "@/styles/Home.module.scss";
import Header from "@/components/Molecules/Header/Header";
import WindowBox from "@/components/Organism/Window/WindowBox";
import InputBox from "@/components/Molecules/InputBox/InputBox";
import { useState } from "react";
import SelectBox from "@/components/Molecules/SelectBox/SelectBox";
import { ageList, themeList } from "@/constants/common";
import Button from "@/components/Atoms/Button/Button";
import Toast from "@/components/Atoms/Toast/Toast";
import type { GetStaticPropsContext } from "next";
import { useTranslations, useLocale } from "next-intl";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";
import { useGoToLogin } from "@/hooks/useGoToLogin";
import { useStories } from "@/hooks/useStories";
import { StoriesSection } from "@/components/Organism/StoriesSection/StoriesSection";

export default function Home() {
  const [age, setAge] = useState("");
  const [theme, setTheme] = useState("");
  const [protagonist, setProtagonist] = useState("");
  const [friend, setFriend] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const t = useTranslations("Home");
  const tAge = useTranslations("Ages");
  const tTheme = useTranslations("Themes");
  const locale = useLocale();
  const user = useUser();
  const goToLogin = useGoToLogin();
  const { stories, loadStories } = useStories();

  const translatedAges = ageList.map((item) => ({
    value: item.value,
    label: tAge(item.value),
  }));

  const translatedThemes = themeList.map((item) => ({
    value: item.value,
    label: tTheme(item.value),
  }));

  const handleGenerate = async () => {
    setLoading(true);
    setError(false);
    setSaved(false);
    setSaveError(false);

    try {
      const res = await fetch("/api/generateStory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ age, theme, protagonist, friend, locale }),
      });

      const data = await res.json();

      if (data.output) {
        setResponse(data.output);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const [title, ...rest] = response.split("\n");
  const story = rest.join("\n").trim();

  const handleSave = async () => {
    const { error } = await supabase.from("stories").insert({
      title: title,
      content: story,
      age_range: age,
      theme: theme,
      locale: locale,
    });
    if (error) {
      console.error("Error:", error);
      setSaveError(true);
    } else {
      setSaved(true);
      loadStories();
    }
  };

  return (
    <>
      <Head>
        <title>Storyteller</title>
        <meta
          name="description"
          content="A customised Gemini APP that generates stories for children aged 2 to 5! <3 
          Developed by a tired mum :)"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>
        <Header logo={"Storyteller"} />
        <div className={style.content}>
          {error && (
            <Toast
              setAction={setError}
              title={t("errorTitle")}
              message={t("createErr")}
            />
          )}
          <WindowBox title={t("boxTitle")}>
            <div className={style.container}>
              <SelectBox
                label={t("boxAge")}
                list={translatedAges}
                setAction={setAge}
              />
              <SelectBox
                label={t("boxTheme")}
                list={translatedThemes}
                setAction={setTheme}
              />
              <InputBox
                label={t("boxProtagonist")}
                value={protagonist}
                setValue={setProtagonist}
              />
              <InputBox
                label={t("boxFriend")}
                value={friend}
                setValue={setFriend}
              />
              <Button
                label={t("generate")}
                onClick={handleGenerate}
                disabled={
                  age.trim().length <= 0 ||
                  theme.trim().length <= 0 ||
                  protagonist.trim().length <= 0 ||
                  loading
                }
              />
            </div>
            {error && <p>{t("generateErr")}</p>}
            {loading && (
              <div className={style.loading}>
                <p>{t("divLoading")}</p>
              </div>
            )}
            {!loading && response && (
              <div className={style.result}>
                <h3>{title}</h3>
                <p>{story}</p>
                {user ? (
                  <>
                    <Button
                      label={saved ? t("saved") : t("save")}
                      onClick={handleSave}
                      disabled={saved}
                    />
                    {saveError && <p>{t("saveErr")}</p>}
                  </>
                ) : (
                  <Button label={t("logToSave")} onClick={goToLogin} />
                )}

              </div>
            )}
          </WindowBox>
          {user ? (
            <StoriesSection stories={stories} />
          ) : (
            <p>Login to see your saved stories</p>
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
