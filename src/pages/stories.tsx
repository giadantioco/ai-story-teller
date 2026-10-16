import type { GetStaticPropsContext } from "next";
import Head from "next/head";
import Header from "@/components/Molecules/Header/Header";
import style from "@/styles/Stories.module.scss";
import { useStories } from "@/hooks/useStories";
import { useTranslations, useLocale } from "next-intl";
import { useUser } from "@/hooks/useUser";
import Button from "@/components/Atoms/Button/Button";
import { useGoToLogin } from "@/hooks/useGoToLogin";

export default function Stories() {
  const { stories } = useStories();
  const tStories = useTranslations("Stories");
  const tAge = useTranslations("Ages");
  const tTheme = useTranslations("Themes");
  const locale = useLocale();
  const user = useUser();
  const goToLogin = useGoToLogin();

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
          <h1 className={style.title}>{tStories("h1")}</h1>
          {user ? (
            <ul role="list" className={style.storyList}>
              {stories.map((story) => (
                <li key={story.id}>
                  <details className={style.details}>
                    <summary className={style.summary}>
                      <span className={style.storyTitle}>{story.title}</span>
                      <span>
                        {tAge(story.age_range)} · {tTheme(story.theme)}
                      </span>
                      <span>
                        {new Date(story.created_at).toLocaleDateString(locale)}
                      </span>
                    </summary>
                    <p className={style.storyContent}>{story.content}</p>
                  </details>
                </li>
              ))}
            </ul>
          ) : (
            <div className={style.emptyCase}>
              <h3>{tStories("logoutTitle")}</h3>
              <Button label={tStories("goToLogin")} onClick={goToLogin} />
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
