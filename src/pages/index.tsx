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

export default function Home() {
  const [age, setAge] = useState("");
  const [theme, setTheme] = useState("");
  const [protagonist, setProtagonist] = useState("");
  const [friend, setFriend] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/generateStory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ age, theme, protagonist, friend }),
      });

      const data = await res.json();
      console.log(JSON.stringify(data.output));

      if (data.output) {
        setResponse(data.output);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Errore:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const [title, ...rest] = response.split("\n");
  const story = rest.join("\n").trim();

  return (
    <>
      <Head>
        <title>Storyteller</title>
        <meta
          name="description"
          content="A customised Gemini that generates stories for children aged 2 to 5! <3 
          Developed by a tired mum :)"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>
        <Header title={"Storyteller"} />
        <div className={style.content}>
          {error && (
            <Toast
              setAction={setError}
              title="Error"
              message="Error creating the story"
            />
          )}
          <WindowBox title="Story Params">
            <div className={style.container}>
              <SelectBox label="Age:" list={ageList} setAction={setAge} />
              <SelectBox label="Theme:" list={themeList} setAction={setTheme} />
              <InputBox
                label={"Protagonist's name"}
                value={protagonist}
                setValue={setProtagonist}
              />
              <InputBox
                label={"Friend's name (optional)"}
                value={friend}
                setValue={setFriend}
              />
              <Button
                label="Generate"
                onClick={handleGenerate}
                disabled={
                  age.trim().length <= 0 ||
                  theme.trim().length <= 0 ||
                  protagonist.trim().length <= 0 ||
                  loading
                }
              />
            </div>
            {error && <p>Error while generating story</p>}
            {loading && (
              <div className={style.loading}>
                <p>loading...</p>
              </div>
            )}
            {!loading && response && (
              <div className={style.result}>
                <div className={style.btn}></div>
                <h3>{title}</h3>
                <p>{story}</p>
              </div>
            )}
          </WindowBox>
        </div>
      </main>
    </>
  );
}
