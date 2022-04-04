import { weapons } from "./data/weapons";
import { AttackResult } from "./utilTypes";
import { Weapon } from "./Weapon";

export class Character {
  public thac0: number;
  constructor(
    public name: string,
    public level: number,
    public weapon: Weapon,
    public toHitBonus: number,
    public damageBonus: number,
    thac0: number
  ) {
    this.thac0 = thac0;
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
}
