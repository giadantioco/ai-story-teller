import Head from "next/head";
import style from "@/styles/Home.module.scss";
import Header from "@/components/Molecules/Header/Header";
import Footer from "@/components/Molecules/Footer/Footer";
import WindowBox from "@/components/Organism/Window/WindowBox";
import { useState } from "react";
import Toast from "@/components/Atoms/Toast/Toast";
import type { GetStaticPropsContext } from "next";
import { useTranslations, useLocale } from "next-intl";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";
import { useStories } from "@/hooks/useStories";
import { StoriesSection } from "@/components/Organism/StoriesSection/StoriesSection";
import { StoryResult } from "@/components/Organism/StoryResult/StoryResult";
import { StoryForm } from "@/components/Organism/StoryForm/StoryForm";

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
  const locale = useLocale();
  const user = useUser();
  const { stories, loadStories } = useStories();

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
          <div className={style.titleContainer}>
            <span>{t("eyebrown")}</span>
            <h1>{t("title")}</h1>
            <h3>{t("subTitle")}</h3>
          </div>
          {error && (
            <Toast
              setAction={setError}
              title={t("errorTitle")}
              message={t("createErr")}
            />
          )}
          <WindowBox>
            <StoryForm
              age={age}
              theme={theme}
              protagonist={protagonist}
              friend={friend}
              setAge={setAge}
              setTheme={setTheme}
              setProtagonist={setProtagonist}
              setFriend={setFriend}
              loading={loading}
              onGenerate={handleGenerate}
            />

            {error && <p>{t("generateErr")}</p>}
            {loading && (
              <div className={style.loading}>
                <p>{t("divLoading")}</p>
              </div>
            )}
            {!loading && response && (
              <StoryResult
                title={title}
                story={story}
                saved={saved}
                saveError={saveError}
                onSave={handleSave}
              />
            )}
          </WindowBox>
          {user ? (
            <StoriesSection stories={stories} />
          ) : (
            <p>Login to see your saved stories</p>
          )}
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
