import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useCharStore } from "../components/charStore";
import { CharEditor } from "../components/dndCharEditor";
import { DamageList } from "../components/dndDmgList";
import styles from "../styles/Layout.module.css";

const DamageView: NextPage = () => {
  const router = useRouter();
  const { state } = useCharStore();

  const { charId } = router.query;
  const [compareCharId, setCompareCharId] = useState("");

  const charSheet = state.find((char) => char.uuid === charId);
  const charSheetCompare = state.find((char) => char.uuid === compareCharId);

  const handleCurrentCharChange = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push({
      query: {
        charId: e.currentTarget.value,
      },
    });
  };

  const handleCompareCharChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCompareCharId(e.currentTarget.value);
  };

  return (
    <>
      <div className={styles.controls}>
        <label htmlFor="currentChar">Character:</label>
        <select
          name="currentChar"
          value={charId}
          onChange={handleCurrentCharChange}
        >
          <option value="">None</option>
          <optgroup label="Characters">
            {state.map((char) => (
              <option key={char.uuid} value={char.uuid}>
                {char.name} {char.charClass} {char.level}
              </option>
            ))}
          </optgroup>
        </select>

        <label htmlFor="compareChar">Compare with:</label>
        <select
          name="compareChar"
          value={compareCharId}
          onChange={handleCompareCharChange}
        >
          <option value="">None</option>
          <optgroup label="Characters">
            {state
              .filter((char) => char.uuid !== charId)
              .map((char) => (
                <option key={char.uuid} value={char.uuid}>
                  {char.name} {char.charClass} {char.level}
                </option>
              ))}
          </optgroup>
        </select>
      </div>

      <div className={styles.grid}>
        {charSheet && (
          <div className={styles.container}>
            <CharEditor charSheet={charSheet} />
            <DamageList charSheet={charSheet} />
          </div>
        )}

        {charSheetCompare && (
          <div className={styles.container}>
            <CharEditor charSheet={charSheetCompare} readOnly />
            <DamageList charSheet={charSheetCompare} />
          </div>
        )}
      </div>
    </>
  );
};

export default DamageView;
