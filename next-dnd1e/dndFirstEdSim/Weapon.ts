import { weapons, WeaponTypes } from "./data/weapons";
import { diceDamageParser, WeaponDamage } from "./dice-parser";

export interface RandomDamage {
  sum: number;
  weaponBonus: number;
  charBonus: number;
  rolls: number[];
  weaponDamage: WeaponDamage;
}

export interface AttackResult {
  targetAc: number;
  toHitNeeded: number;
  roll: number;
  attack: number;
  isHit: boolean;
  isCrit: boolean;
  damage: RandomDamage | null;
}

export interface WeaponSheet {
  name: string;
  type: WeaponTypes;
  magicalBonus: number;
}

export class Weapon implements WeaponSheet {
  #type: WeaponTypes = WeaponTypes.longsword;
  damageSM: WeaponDamage = { diceString: "", dices: 0, perDice: 0, plus: 0 };
  damageL: WeaponDamage = { diceString: "", dices: 0, perDice: 0, plus: 0 };

  constructor(
    public name: string,
    type: WeaponTypes,
    public magicalBonus: number
  ) {
    this.type = type;
  }

  // ensure damages are updated
  set type(type: WeaponTypes) {
    this.#type = type;
    const weaponInfo = weapons[type];
    this.damageSM = diceDamageParser(weaponInfo.diceStringSM);
    this.damageL = diceDamageParser(weaponInfo.diceStringL);
  }

  get type() {
    return this.#type;
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

  damageRange(isLargeTarget: boolean): string {
    return `${this.minDamage(isLargeTarget)}-${this.maxDamage(isLargeTarget)}`;
  }

  randomDamage(
    isLargeTarget: boolean,
    charDamageBonus: number = 0
  ): RandomDamage {
    const weaponDamage = isLargeTarget ? this.damageL : this.damageSM;
    const dices = weaponDamage.dices;
    const perDice = weaponDamage.perDice;

    let totalDmg = weaponDamage.plus;
    const dicesRolled: number[] = [];

    for (let i = 0; i < dices; i++) {
      const rngDmg = 1 + Math.floor(Math.random() * perDice);
      totalDmg += rngDmg;
      dicesRolled.push(rngDmg);
    }

    const sum = totalDmg + this.magicalBonus + charDamageBonus;

    const result: RandomDamage = {
      sum,
      weaponBonus: this.magicalBonus,
      charBonus: charDamageBonus,
      rolls: dicesRolled,
      weaponDamage,
    };

    return result;
  }

  averageDamage(isLargeTarget: boolean, simulations: number = 100_000) {
    let sum = 0;
    for (let i = 0; i < simulations; i++) {
      sum += this.randomDamage(isLargeTarget).sum;
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

  toWeaponSheet(): WeaponSheet {
    const weaponSheet = {
      name: this.name,
      type: this.type,
      magicalBonus: this.magicalBonus,
    };

    return weaponSheet;
  }

  static parseWeapon(weaponSheet: WeaponSheet): Weapon {
    return new Weapon(
      weaponSheet.name,
      weaponSheet.type,
      weaponSheet.magicalBonus
    );
  }

  static newGenericWeapon() {
    return new Weapon("", WeaponTypes.fist, 0);
  }
}
