import Head from "next/head";
import React, {
  FunctionComponent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { Character } from "../dndFirstEdSim/Character";
import styles from "../styles/Home.module.css";
import { loadCharsFromLocalStorage } from "../utils/storage";
import { CharEditor } from "./dndCharEditor";

export const CharList: FunctionComponent = () => {
  const [charList, setCharList] = useState<Character[]>([]);

  useEffect(() => {
    setCharList(loadCharsFromLocalStorage());
  }, []);

  console.log({ charList });

  const addChar = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCharList((s) => [...s, Character.newGenericChar(crypto.randomUUID())]);
  };

  const removeCharFromList = (uuid: string) => {
    setCharList((s) => s.filter((char) => char.uuid !== uuid));
  };

  return (
    <>
      <Head>
        <title>D&D 1e utils</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>D&D 1e damage sim</h1>

        <div className={styles.grid}>
          {charList.map((char) => (
            <CharEditor
              key={char.uuid}
              charSheet={char.toCharSheet()}
              removeCharFromList={removeCharFromList}
            />
          ))}
        </div>
        <div>
          <button onClick={addChar}>new char</button>
        </div>
      </main>
    </>
  );
};
