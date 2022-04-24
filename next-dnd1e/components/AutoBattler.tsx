import { FC } from "react";
import { Character, CharSheet } from "../dndFirstEdSim/Character";
import styles from "../styles/Layout.module.css";

type Props = {
  charSheet: CharSheet;
  opponentSheet: CharSheet;
};

export const AutoBattler: FC<Props> = ({ charSheet, opponentSheet }) => {
  const character = Character.parseCharacterSheet(charSheet);
  const opponent = Character.parseCharacterSheet(opponentSheet);

  //   const combat =

  return (
    <>
      <div className={styles.controls}>
        {character.name} the lvl {character.level} {character.charClass} vs{" "}
        {opponent.name} the lvl {opponent.level} {opponent.charClass}
      </div>
    </>
  );
};
