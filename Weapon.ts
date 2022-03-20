import { weapons, WeaponTypes } from "./data/weapons";
import { diceDamageParser, WeaponDamage } from "./dice-parser";

export class Weapon {
  damageSM: WeaponDamage;
  damageL: WeaponDamage;

  constructor(
    public name: string,
    public type: WeaponTypes,
    public magicalBonus: number = 0
  ) {
    const weaponInfo = weapons[type];
    this.damageSM = diceDamageParser(weaponInfo.diceStringSM);
    this.damageL = diceDamageParser(weaponInfo.diceStringL);
  }

  minDamage(isLargeTarget: boolean): number {
    const dmg = isLargeTarget
      ? this.damageL.dices + this.damageL.plus
      : this.damageSM.dices + this.damageSM.plus;
    return dmg + this.magicalBonus;
  }

  maxDamage(isLargeTarget: boolean): number {
    const dmg = isLargeTarget
      ? this.damageL.dices * this.damageL.perDice + this.damageL.plus
      : this.damageSM.dices * this.damageSM.perDice + this.damageSM.plus;
    return dmg + this.magicalBonus;
  }

  randomDamage(isLargeTarget: boolean, damageBonus: number = 0): number {
    let totalDmg = isLargeTarget ? this.damageL.plus : this.damageSM.plus;
    const dices = isLargeTarget ? this.damageL.dices : this.damageSM.dices;
    const perDice = isLargeTarget
      ? this.damageL.perDice
      : this.damageSM.perDice;

    for (let i = 0; i < dices; i++) {
      let rngDmg = Math.ceil(Math.random() * perDice);
      totalDmg += rngDmg;
    }
    return totalDmg + this.magicalBonus;
  }

  averageDamage(isLargeTarget: boolean, simulations: number = 100_000) {
    let sum = 0;
    for (let i = 0; i < simulations; i++) {
      sum += this.randomDamage(isLargeTarget);
    }
    return sum / simulations;
  }

  info() {
    return {
      SM: {
        diceString: this.damageSM.diceString,
        min: this.minDamage(false),
        max: this.maxDamage(false),
        average: this.averageDamage(false),
      },
      L: {
        diceString: this.damageL.diceString,
        min: this.minDamage(true),
        max: this.maxDamage(true),
        average: this.averageDamage(true),
      },
    };
  }
}
