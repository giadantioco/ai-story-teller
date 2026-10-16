import type { GetStaticPropsContext } from "next";
import Head from "next/head";
import Header from "@/components/Molecules/Header/Header";
import style from "@/styles/Login.module.scss";
import { useStories } from "@/hooks/useStories";
import { useTranslations } from "next-intl";

export default function Stories() {
  const { stories } = useStories();
  const tStories = useTranslations("Stories");

  return (
    <div>
      <Head>
        <title>{tStories("headTitle")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>
        <Header logo={"Storyteller"} />
        <h1>{tStories("h1")}</h1>
        <ul>
          {stories.map((story) => (
            <li key={story.id}>{story.title}</li>
          ))}
        </ul>
      </main>
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
