import { FC, useEffect, useState } from "react";
import { Battle, BattleOutcome } from "../dndFirstEdSim/Battle";
import { Character, CharSheet } from "../dndFirstEdSim/Character";
import { randomKillDescription } from "../dndFirstEdSim/utilities";
import styles from "../styles/Layout.module.css";
import { AttackRoll } from "./dndAttackRoll";

const BATTLE_SPEED = 500;

type Props = {
  charSheet: CharSheet;
  opponentSheet: CharSheet;
};

export const AutoBattler: FC<Props> = ({ charSheet, opponentSheet }) => {
  const [battle, setBattle] = useState<BattleOutcome | null>(null);
  const [shouldRestart, setShouldRestart] = useState(false);
  const [battleStarted, setBattleStarted] = useState(false);
  const [battleRoundShown, setBattleRoundShown] = useState(0);

  // rerun battle if characters change
  useEffect(() => {
    setShouldRestart(true);
  }, [charSheet, opponentSheet]);

  // run battle initially or if button clicked
  useEffect(() => {
    if (!battle || shouldRestart) {
      const character = Character.parseCharacterSheet(charSheet);
      const opponent = Character.parseCharacterSheet(opponentSheet);
      const battleObj = new Battle(character, opponent);
      const battleOutcome = battleObj.battle();

      setBattle(battleOutcome);
      setShouldRestart(false);
      setBattleRoundShown(0);
    }
  }, [battle, shouldRestart, charSheet, opponentSheet]);

  // scrolling output for increased drama
  useEffect(() => {
    const timer = setInterval(() => {
      if (battleStarted && battleRoundShown < (battle?.rounds.length ?? 0)) {
        setBattleRoundShown((s) => s + 1);
      }
    }, BATTLE_SPEED);

    return () => clearInterval(timer);
  }, [battle, battleStarted, battleRoundShown]);

  // start or restart, depending
  const handleStart = () => {
    if (battleStarted) {
      setShouldRestart((s) => !s);
      setBattleStarted(false);
    } else {
      setBattleStarted(true);
    }
  };

  if (!battle) return null;

  return (
    <>
      <div className={styles.controls}>
        <button onClick={handleStart}>
          {battleStarted ? "restart" : "start"}
        </button>
      </div>
      <div className={styles.row}>
        {charSheet.name} the lvl {charSheet.level} {charSheet.charClass} vs{" "}
        {opponentSheet.name} the lvl {opponentSheet.level}{" "}
        {opponentSheet.charClass}
      </div>
      <div className={styles.container}>
        {battle.rounds.map((round) => {
          if (round.nr > battleRoundShown) return null;

          const { nr: roundNr, isDone } = round;
          const hitpoints = battle.hitpoints[roundNr - 1];
          return (
            <div key={roundNr}>
              round:{roundNr}
              {round.actionOrder.map((participant) => {
                const result = round[participant];
                const { targetId, attack, initiative, otherAction } = result;
                const char =
                  participant === "player" ? charSheet : opponentSheet;
                const charEnemy =
                  participant === "player" ? opponentSheet : charSheet;
                const currentHp = hitpoints[char.uuid];
                const targetHp = hitpoints[targetId];
                if (currentHp <= 0) return null;
                return (
                  <div key={participant}>
                    {`${char.name} (${currentHp}/${char.hp} hp)`} (initiative:{" "}
                    {initiative}) attacks {charEnemy.name} ac: {attack.targetAc}{" "}
                    (roll:{attack.roll} attack:{attack.attack} needed:
                    {attack.toHitNeeded}){" "}
                    {attack.isHit
                      ? `for ${attack.damage?.sum}${
                          attack.isCrit ? " CRIT!" : ""
                        }`
                      : "Miss!"}
                    {attack.isHit && attack.damage && (
                      <AttackRoll damage={attack.damage} />
                    )}
                    {attack.isHit && targetHp <= 0 && (
                      <div>
                        {charEnemy.name} was{" "}
                        {randomKillDescription(char.weapon.type)} by {char.name}
                      </div>
                    )}
                  </div>
                );
              })}
              {isDone && <div>Battle completed</div>}
            </div>
          );
        })}
      </div>
    </>
  );
};
