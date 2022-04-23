import { FC, useMemo } from "react";
import { Character, CharSheet } from "../dndFirstEdSim/Character";
import styles from "../styles/Layout.module.css";

const SIMULATIONS = 10_000;

interface Props {
  charSheet: CharSheet;
}

export const DamageList: FC<Props> = ({ charSheet }) => {
  const character = useMemo(
    () => Character.parseCharacterSheet(charSheet),
    [charSheet]
  );

  // prevent expensive simulation reruns on edits of other chars
  const avgDamageVsAcs = useMemo(
    () =>
      new Array(21)
        .fill(null)
        .map((_, idx) => ({
          sm: character.averageAttack(idx - 10, false, SIMULATIONS),
          l: character.averageAttack(idx - 10, true, SIMULATIONS),
        }))
        .reverse(),
    [character]
  );

  return (
    <>
      <div className={styles.container}>
        {/* {JSON.stringify(character.)} */}
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th colSpan={2}>Dmg vs S/M</th>
              <th colSpan={2}>Dmg vs L</th>
            </tr>
            <tr>
              <th>AC</th>
              <th>Hitrate</th>
              <th>Hit-crits</th>
              <th>All</th>
              <th>Hits</th>
              <th>All</th>
              <th>Hits</th>
            </tr>
          </thead>
          <tbody>
            {avgDamageVsAcs.map((result, idx) => {
              return (
                <tr key={idx}>
                  <td>{result.sm.targetAc}</td>
                  <td>{(result.sm.hitrate * 100).toFixed(0) + "%"}</td>
                  <td>
                    {(
                      (result.sm.hits > 0
                        ? result.sm.crits / result.sm.hits
                        : 0) * 100
                    ).toFixed(0) + "%"}
                  </td>
                  <td>{result.sm.averageDamageAll.toFixed(1)}</td>
                  <td>{result.sm.averageDamageHits.toFixed(1)}</td>
                  <td>{result.l.averageDamageAll.toFixed(1)}</td>
                  <td>{result.l.averageDamageHits.toFixed(1)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
