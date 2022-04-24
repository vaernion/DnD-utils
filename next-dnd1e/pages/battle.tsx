import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { AutoBattler } from "../components/AutoBattler";
import { CharSelect } from "../components/CharSelect";
import { useCharStore } from "../components/charStore";
import { CharEditor } from "../components/dndCharEditor";
import styles from "../styles/Layout.module.css";

const BattlePage: NextPage = () => {
  const router = useRouter();
  const { state } = useCharStore();

  const charId =
    typeof router.query.charId === "string" ? router.query.charId : "";
  const [compareCharId, setCompareCharId] = useState("");

  const charSheet = state.find((char) => char.uuid === charId);
  const charSheetCompare = state.find((char) => char.uuid === compareCharId);

  const handleCurrentCharChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    router.push({
      query: {
        charId: value,
      },
    });
    if (value === compareCharId) setCompareCharId("");
  };

  const handleCompareCharChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    setCompareCharId(value);
  };

  return (
    <>
      <Head>
        <title>Damage{charSheet ? ` - ${charSheet.name}` : ""}</title>
      </Head>

      <div className={styles.controls}>
        <CharSelect
          label="Character"
          activeCharId={charId}
          onCharChange={handleCurrentCharChange}
        />

        <CharSelect
          label="Opponent"
          activeCharId={compareCharId}
          onCharChange={handleCompareCharChange}
          charFilter={(char) => char.uuid !== charId}
        />
      </div>

      <div className={styles.grid}>
        {charSheet && <CharEditor charSheet={charSheet} />}
        {charSheetCompare && (
          <CharEditor charSheet={charSheetCompare} readOnly />
        )}
      </div>

      <div className={styles.container}>
        {charSheet && charSheetCompare && (
          <AutoBattler charSheet={charSheet} opponentSheet={charSheetCompare} />
        )}
      </div>
    </>
  );
};

export default BattlePage;
