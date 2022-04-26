import { v4 as randomUUID } from "uuid";
import { attackMatrix, CharClasses } from "./data/classes";
import { weapons } from "./data/weapons";
import { AttackResult, Weapon, WeaponSheet } from "./Weapon";

export type CharacterArgs = ConstructorParameters<typeof Character>;

export interface CharSheet {
  uuid: string;
  name: string;
  charClass: CharClasses;
  level: number;
  hp: number;
  ac: number;
  toHitBonus: number;
  damageBonus: number;
  weapon: WeaponSheet;
}

export class Character implements CharSheet {
  public uuid;
  public thac0;

  constructor(
    uuid: string | null,
    public name: string,
    public charClass: CharClasses,
    public level: number,
    public hp: number,
    public ac: number,
    public toHitBonus: number,
    public damageBonus: number,
    public weapon: Weapon,
    public isLarge: boolean = false
  ) {
    this.uuid = uuid ? uuid : randomUUID();

    const thac0MaxLevel = level > 21 ? 21 : level;
    this.thac0 = attackMatrix[charClass][thac0MaxLevel];
  }

  randomAttack(targetAc: number, isLargeTarget: boolean = false): AttackResult {
    const toHitNeeded = this.toHitNeeded(targetAc);
    const roll = 1 + Math.floor(Math.random() * 20);
    const attack = roll + this.toHitBonus + this.weapon.magicalBonus;

    const isHit = attack >= toHitNeeded;
    const randomDamage = this.weapon.randomDamage(
      isLargeTarget,
      this.damageBonus
    );

    const isCrit = roll === 20;
    if (isCrit) randomDamage.sum *= 2;

    return {
      targetAc,
      toHitNeeded,
      roll,
      attack,
      isHit,
      isCrit,
      damage: isHit ? randomDamage : null,
    };
  }

  averageAttack(
    targetAc: number,
    isLargeTarget: boolean,
    simulations: number = 100_000
  ) {
    let damageSum = 0;
    let hits = 0;
    let crits = 0;

    let lastAttack;

    for (let i = 0; i < simulations; i++) {
      const attack = this.randomAttack(targetAc, isLargeTarget);
      if (attack.isHit && attack.damage) {
        hits++;
        damageSum += attack.damage.sum;
        if (attack.isCrit) crits++;
      }
      lastAttack = attack;
    }

    const result = {
      simulations,
      targetAc,
      hits,
      hitrate: hits / simulations,
      crits,
      averageDamageAll: damageSum / simulations,
      averageDamageHits: damageSum / (hits > 0 ? hits : 1),
      lastAttack,
    };
    return result;
  }

  toHitNeeded(targetAc: number) {
    const constrictedAc = targetAc < 2 ? 2 : targetAc > 10 ? 10 : targetAc;
    const acAdjustment =
      weapons[this.weapon.type].acAdjustments[constrictedAc - 2]; // adjustments start at ac 2
    return this.thac0 - targetAc - acAdjustment;
  }

  toCharSheet(): CharSheet {
    const charSheet = {
      uuid: this.uuid,
      name: this.name,
      charClass: this.charClass,
      level: this.level,
      hp: this.hp,
      ac: this.ac,
      toHitBonus: this.toHitBonus,
      damageBonus: this.damageBonus,
      // avoid nested JSON encoding
      weapon: this.weapon.toWeaponSheet(),
    };
    return charSheet;
  }

  static parseCharacterSheet(charSheet: CharSheet): Character {
    return new Character(
      charSheet.uuid,
      charSheet.name,
      charSheet.charClass,
      charSheet.level,
      charSheet.hp,
      charSheet.ac,
      charSheet.toHitBonus,
      charSheet.damageBonus,
      new Weapon(
        charSheet.weapon.name,
        charSheet.weapon.type,
        charSheet.weapon.magicalBonus
      )
    );
  }

  static newGenericChar(uuid?: string) {
    return new Character(
      uuid ? uuid : null,
      "",
      CharClasses.fighter,
      0,
      0,
      0,
      0,
      0,
      Weapon.newGenericWeapon()
    );
  }
}
