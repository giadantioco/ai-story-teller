import Head from "next/head";
import style from "@/styles/Home.module.scss";
import Header from "@/components/Molecules/Header/Header";
import WindowBox from "@/components/Organism/Window/WindowBox";
import InputBox from "@/components/Molecules/InputBox/InputBox";
import { useState } from "react";
import SelectBox from "@/components/Molecules/SelectBox/SelectBox";
import { genreList } from "@/constants/common";
import Button from "@/components/Atoms/Button/Button";

import Switch from "@/components/Atoms/Switch/Switch";

export default function Home() {
  const [protagonist, setProtagonist] = useState("");
  const [antagonist, setAntagonist] = useState("");
  const [genre, setGenre] = useState("");
  const [pagi18, setPagi18] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError(false);

    const prompt = `Generate an ${genre} story for ${
      pagi18 ? "adults" : "children"
    }, with ${protagonist} as protagonist and ${antagonist} as antagonist`;

    //controlliamo se esiste
    if (process.env.NEXT_PUBLIC_GEMINI_KEY) {
      if (
        protagonist.trim().length > 0 &&
        antagonist.trim().length > 0 &&
        genre.trim().length > 0
      ) {
        // se esiste crea istanza
        try {
          const response = await fetch("/api/generate", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ prompt }),
          });
          const data = await response.json();
          console.log(data);
          setResponse(data.output);
          if (!data.ok) {
            throw new Error("errore");
          }
          setResponse(data.message);
        } catch (e) {
          console.log("nostro errore:", e);
          setError(true);
        }
      }
    }
    setLoading(false);
  };

  const handleVoice = () => {
    const utterance = new SpeechSynthesisUtterance(response);
    utterance.lang = "en-EN";
    setIsPlaying(true);
    speechSynthesis.speak(utterance);

    utterance.onend = () => {
      setIsPlaying(false);
    };
    utterance.rate = 0.2;
  };

  const handleStopVoice = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <>
      <Head>
        <title>AI Story Teller</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>
        <Header title={"AI Story Teller"} />
        <div className={style.content}>
          <WindowBox title="Story Params">
            <div className={style.container}>
              <InputBox
                label={"Protagonist's name"}
                value={protagonist}
                setValue={setProtagonist}
              />
              <InputBox
                label={"Antagonist's name"}
                value={antagonist}
                setValue={setAntagonist}
              />
              <SelectBox label="Genre:" list={genreList} setAction={setGenre} />
              <Switch active={pagi18} setActive={setPagi18} />
              <Button
                label="Generate"
                onClick={handleGenerate}
                disabled={
                  protagonist.trim().length <= 0 ||
                  antagonist.trim().length <= 0 ||
                  genre.trim().length <= 0 ||
                  loading
                }
              />
            </div>
            {error && <p>errore nella generazione</p>}
            {loading && (
              <div className={style.loading}>
                <p>loading...</p>
              </div>
            )}
            {!loading && response && (
              <div className={style.result}>
                <div className={style.btn}>
                  {isPlaying ? (
                    <Button label="Stop Story" onClick={handleStopVoice} />
                  ) : (
                    <Button label="Play Story" onClick={handleVoice} />
                  )}
                </div>
                {response}
              </div>
            )}
          </WindowBox>
        </div>
      </main>
    </>
  );
}
