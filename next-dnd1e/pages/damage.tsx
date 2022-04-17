import { NextPage } from "next";
import { useRouter } from "next/router";
import { Character } from "../dndFirstEdSim/Character";
import styles from "../styles/Layout.module.css";
import { loadSingleCharFromLocalStorage } from "../utils/storage";

const DamageView: NextPage = () => {
  const router = useRouter();
  const { charId } = router.query;
  const charSheet = loadSingleCharFromLocalStorage(
    typeof charId === "string" ? charId : ""
  );
  if (!charSheet) return null;

  const character = Character.parseCharacterSheet(charSheet);

  return (
    <>
      <div className={styles.card}>
        {JSON.stringify(router.query)}

        {JSON.stringify(character.weapon.info())}
      </div>
    </>
  );
};

export default DamageView;
