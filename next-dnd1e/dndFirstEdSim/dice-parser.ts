export interface WeaponDamage {
  diceString: string;
  dices: number;
  perDice: number;
  plus: number;
}

// parses a string like "1d6" or "3d4+1"
export function diceDamageParser(diceDamage: string): WeaponDamage {
  const damage: WeaponDamage = {
    diceString: diceDamage,
    dices: 0,
    perDice: 0,
    plus: 0,
  };
  try {
    const bonusSplit = diceDamage.split("+");
    damage.plus = bonusSplit.length === 2 ? Number(bonusSplit[1]) : 0;
    const diceSplit = bonusSplit[0].split("d");
    if (diceSplit.length !== 2) throw new Error("one 'd' expected");

    damage.dices = Number(diceSplit[0]);
    damage.perDice = Number(diceSplit[1]);

    for (const sussy of Object.values(damage)) {
      if (Number.isNaN(sussy)) throw new Error("NaN");
    }

    return damage;
  } catch (err: unknown) {
    throw new Error(
      `Invalid dice string: ${diceDamage} -- ${
        err instanceof Error ? err.message : err
      }`
    );
  }
}
