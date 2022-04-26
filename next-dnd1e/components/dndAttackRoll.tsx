import { FC } from "react";
import { RandomDamage } from "../dndFirstEdSim/Weapon";

type Props = {
  damage: RandomDamage;
};

export const AttackRoll: FC<Props> = ({ damage }) => {
  return (
    <>
      <span>
        {" "}
        ({damage.weaponDamage.diceString}:{" "}
        {damage.rolls.map((roll, idx, arr) => (
          <span key={idx}>
            {roll}
            {idx !== arr.length - 1 && ","}
          </span>
        ))}{" "}
        + weapon: {damage.weaponBonus} + char: {damage.charBonus} )
      </span>
    </>
  );
};
