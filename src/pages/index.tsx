import Head from "next/head";
import style from "@/styles/Home.module.css";
import Header from "@/components/Molecules/Header/Header";
import WindowBox from "@/components/Organism/Window/WindowBox";
import InputBox from "@/components/Molecules/InputBox/InputBox";
import { useState } from "react";
import SelectBox from "@/components/Molecules/SelectBox/SelectBox";
import { genreList } from "@/constants/common";

export default function Home() {
  const [protagonist, setProtagonist] = useState("");
  const [antagonist, setAntagonist] = useState("");

  const [genre, setGenre] = useState("");

  const genreList = [
    {
      label: "",
      value: "",
    },
  ];

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
              ></InputBox>
              <InputBox
                label={"Antagonist's name"}
                value={antagonist}
                setValue={setAntagonist}
              ></InputBox>
            </div>
            <div className={style.container}>
              <SelectBox label="Genre:" list={genreList} setAction={setGenre} />
            </div>
          </WindowBox>
        </div>
      </main>
    </>
  );
}
