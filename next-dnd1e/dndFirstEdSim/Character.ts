import { randomUUID } from "crypto";
import { attackMatrix, CharClasses } from "./data/classes";
import { weapons } from "./data/weapons";
import { AttackResult } from "./utilTypes";
import { Weapon, WeaponSheet } from "./Weapon";

export type CharacterArgs = ConstructorParameters<typeof Character>;

export interface CharSheet {
  uuid: string;
  name: string;
  charClass: CharClasses;
  level: number;
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
    public toHitBonus: number,
    public damageBonus: number,
    public weapon: Weapon
  ) {
    this.uuid = uuid ? uuid : randomUUID();

    const thac0MaxLevel = level > 21 ? 21 : level;
    this.thac0 = attackMatrix[charClass][thac0MaxLevel];
  }

  randomAttack(targetAc: number, isLargeTarget: boolean = false): AttackResult {
    const toHitNeeded = this.toHitNeeded(targetAc);
    const roll = Math.ceil(Math.random() * 20);
    const attack = roll + this.toHitBonus + this.weapon.magicalBonus;

    const isHit = attack >= toHitNeeded;
    let damage = isHit
      ? this.weapon.randomDamage(isLargeTarget, this.damageBonus)
      : 0;

    const isCrit = roll === 20;
    if (isCrit) damage *= 2;

    return { targetAc, toHitNeeded, roll, attack, isHit, isCrit, damage };
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
      if (attack.isHit) {
        hits++;
        damageSum += attack.damage;
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
      averageDamageHits: damageSum / hits,
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
      Weapon.newGenericWeapon()
    );
  }
}
