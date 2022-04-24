import React, { FC } from "react";
import { Character } from "../dndFirstEdSim/Character";
import { CharStoreType } from "../reducers/charStoreReducer";
import styles from "../styles/Layout.module.css";
import { useCharStore } from "./charStore";
import { CharEditor } from "./dndCharEditor";

export const CharList: FC = () => {
  const { state, dispatch } = useCharStore();

  const handleAddChar = () => {
    dispatch({
      type: CharStoreType.ADD_CHAR,
      value: Character.newGenericChar(crypto.randomUUID()).toCharSheet(),
    });
  };

  return (
    <>
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
