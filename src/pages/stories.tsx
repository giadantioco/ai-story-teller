import type { GetStaticPropsContext } from "next";
import Head from "next/head";
import Header from "@/components/Molecules/Header/Header";
import style from "@/styles/Stories.module.scss";
import { useStories } from "@/hooks/useStories";
import { useTranslations, useLocale } from "next-intl";

export default function Stories() {
  const { stories } = useStories();
  const tStories = useTranslations("Stories");
  const locale = useLocale();

  return (
    <>
      <Head>
        <title>{tStories("headTitle")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>
        <Header logo={"Storyteller"} />
        <div className={style.content}>
          <h1>{tStories("h1")}</h1>
          <ul className={style.storyList}>
            {stories.map((story) => (
              <li key={story.id}>
                {story.title}
                {story.content}
                {story.age_range}
                {story.theme}
                {new Date(story.created_at).toLocaleDateString(locale)}
              </li>
            ))}
          </ul>
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
