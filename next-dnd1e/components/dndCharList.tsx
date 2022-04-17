import Head from "next/head";
import React, { FC, useEffect } from "react";
import { Character } from "../dndFirstEdSim/Character";
import { CharStoreType } from "../reducers/charStoreReducer";
import styles from "../styles/Layout.module.css";
import { loadCharsFromLocalStorage } from "../utils/storage";
import { useCharStore } from "./charStore";
import { CharEditor } from "./dndCharEditor";

export const CharList: FC = () => {
  const { state, dispatch } = useCharStore();

  useEffect(() => {
    dispatch({
      type: CharStoreType.LOAD_CHARS,
      value: loadCharsFromLocalStorage(),
    });
  }, [dispatch]);

  const handleAddChar = () => {
    dispatch({
      type: CharStoreType.ADD_CHAR,
      value: Character.newGenericChar(crypto.randomUUID()).toCharSheet(),
    });
  };

  return (
    <>
      <Head>
        <title>D&D 1e utils</title>
      </Head>

      <h1 className={styles.title}>D&D 1e damage sim</h1>

      <div className={styles.controls}>
        <button onClick={handleAddChar}>new char</button>
      </div>

      <div className={styles.grid}>
        {state.map((char) => (
          <CharEditor key={char.uuid} charSheet={char} />
        ))}
      </div>
    </>
  );
};
