import { Character } from "./Character";
import { WeaponTypes } from "./data/weapons";
import { Weapon } from "./Weapon";

let targetAc = 3;

const emericSword = new Weapon("Longy McLongsword", WeaponTypes.longsword, 2);
const emeric = new Character("Emeric spec", 7, emericSword, 1, 2, 14);

const emericAvgSM = emeric.averageAttack(targetAc, false);
const emericAvgL = emeric.averageAttack(targetAc, true);

console.log({
  emeric,
  //   weaponDamages: emericSword.info(),
  //   randomAttackSM: emeric.randomAttack(3, false),
  //   randomAttackL: emeric.randomAttack(-2, true),
  averageAttackSM: emericAvgSM,
  averageAttackL: emericAvgL,
});

const dunstonSword = new Weapon("Two+2", WeaponTypes.twohanded, 1);
const dunston = new Character("Dunston spec 18/00", 7, dunstonSword, 4, 8, 14);

const dunstonAvgSM = dunston.averageAttack(targetAc, false);
const dunstonAvgL = dunston.averageAttack(targetAc, true);

console.log({
  dunston,
  //   weaponDamages: dunstonSword.info(),
  //   randomAttackSM: dunston.randomAttack(3, false),
  //   randomAttackL: dunston.randomAttack(-2, true),
  //   averageAttackSM: dunstonAvgSM,
  //   averageAttackL: dunstonAvgL,
});

const xavierSword = new Weapon("Longy McLongsword", WeaponTypes.longsword, 1);
const xavier = new Character("Xavier spec 18/00", 7, xavierSword, 4, 8, 14);

const xavierAvgSM = xavier.averageAttack(targetAc, false);
const xavierAvgL = xavier.averageAttack(targetAc, true);

console.log({
  xavier,
  //   weaponDamages: xavierSword.info(),
  //   randomAttackSM: xavier.randomAttack(3, false),
  //   randomAttackL: xavier.randomAttack(-2, true),
  averageAttackSM: xavierAvgSM,
  averageAttackL: xavierAvgL,
});

const dunstonVsEmericSM =
  dunstonAvgSM.averageDamageAll / emericAvgSM.averageDamageAll;
const dunstonVsEmericL =
  dunstonAvgL.averageDamageAll / emericAvgL.averageDamageAll;

const dunstonVsXavierSM =
  dunstonAvgSM.averageDamageAll / xavierAvgSM.averageDamageAll;
const dunstonVsXavierL =
  dunstonAvgL.averageDamageAll / xavierAvgL.averageDamageAll;

const xavierVsEmericSM =
  xavierAvgSM.averageDamageAll / emericAvgSM.averageDamageAll;
const xavierVsEmericL =
  xavierAvgL.averageDamageAll / emericAvgL.averageDamageAll;

console.log({
  dunstonVsEmericSM,
  dunstonVsEmericL,
  dunstonVsXavierSM,
  dunstonVsXavierL,
  xavierVsEmericSM,
  xavierVsEmericL,
  dunstonSM: dunstonAvgSM.averageDamageAll,
  dunstonL: dunstonAvgL.averageDamageAll,
  emericSM: emericAvgSM.averageDamageAll,
  emericL: emericAvgL.averageDamageAll,
  xavierSM: xavierAvgSM.averageDamageAll,
  xavierL: xavierAvgL.averageDamageAll,
});

const superMonkFist = new Weapon(
  "SuperFists of Fisting",
  WeaponTypes.superMonkFist,
  0
);
const superMonk = new Character("Supermonk", 17, superMonkFist, 0, 0, 10);

const superMonkAvgSM = superMonk.averageAttack(targetAc, false);
// const superMonkAvgL = superMonk.averageAttack(targetAc, true);

console.log({
  superMonk,
  weaponDamages: superMonkFist.info(),
  //   randomAttackSM: superMonk.randomAttack(3, false),
  //   randomAttackL: superMonk.randomAttack(-2, true),
  superMonkAvgSM,
  //   superMonkAvgL,
});

const superFighterSword = new Weapon(
  "Longy McLongsword",
  WeaponTypes.twohanded,
  3
);
const superFighter = new Character(
  "Superfighter spec",
  17,
  superFighterSword,
  1 + 3,
  1 + 6,
  4
);

const superFighterAvgSM = superFighter.averageAttack(targetAc, false);
const superFighterAvgL = superFighter.averageAttack(targetAc, true);

console.log({
  superFighter,
  //   weaponDamages: emericSword.info(),
  //   randomAttackSM: emeric.randomAttack(3, false),
  //   randomAttackL: emeric.randomAttack(-2, true),
  superFighterAvgSM,
  superFighterAvgL,
});

const fighterAttacks = 2.5;
const monkAttacks = 3;

const superFighterVsMonkSM =
  (superFighterAvgSM.averageDamageAll * fighterAttacks) /
  (superMonkAvgSM.averageDamageAll * monkAttacks);
const superFighterVsMonkL =
  (superFighterAvgL.averageDamageAll * fighterAttacks) /
  (superMonkAvgSM.averageDamageAll * monkAttacks);

const superFighterDmgSM = superFighterAvgSM.averageDamageAll * fighterAttacks;
const superFighterDmgL = superFighterAvgL.averageDamageAll * fighterAttacks;
const superMonkDmg = superMonkAvgSM.averageDamageAll * monkAttacks;

console.log({
  targetAc,
  fighterAttacks,
  monkAttacks,
  superFighterVsMonkSM,
  superFighterVsMonkL,
  superFighterDmgSM,
  superFighterDmgL,
  superMonkDmg,
});
