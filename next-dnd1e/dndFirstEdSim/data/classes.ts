import { FixedLengthArray } from "../utilTypes";

export enum CharClasses {
  fighter = "Fighter",
  paladin = "Paladin",
  ranger = "Ranger",
  bard = "Bard",
  thief = "Thief",
  assassin = "Assassin",
  cleric = "Cleric",
  druid = "Druid",
  monk = "Monk",
  magicUser = "Magic-User",
  illusionist = "Illusionist",
}

// level 0 to 21+
type thac0Table = FixedLengthArray<22, number>;

// fighters, paladins, rangers, bards, lvl 0 halflings & humans
const fighterTable: thac0Table = [
  20, 20, 20, 18, 18, 16, 16, 14, 14, 12, 12, 10, 10, 8, 8, 6, 6, 4, 4, 4, 4, 4,
] as const;

// thieves and assassins
const thiefTable: thac0Table = [
  20, 20, 20, 20, 20, 19, 19, 19, 19, 16, 16, 16, 16, 14, 14, 14, 14, 12, 12,
  12, 12, 10,
] as const;

// clerics, druids, monks
const clericTable: thac0Table = [
  20, 20, 20, 20, 18, 18, 18, 16, 16, 16, 14, 14, 14, 12, 12, 12, 10, 10, 10, 9,
  9, 9,
] as const;

// magic-users and illusionists
const wizardTable: thac0Table = [
  20, 20, 20, 20, 20, 20, 19, 19, 19, 19, 19, 16, 16, 16, 16, 16, 13, 13, 13,
  13, 13, 11,
] as const;

export const attackMatrix: Record<CharClasses, thac0Table> = {
  [CharClasses.fighter]: fighterTable,
  [CharClasses.paladin]: fighterTable,
  [CharClasses.ranger]: fighterTable,
  [CharClasses.bard]: fighterTable,
  [CharClasses.thief]: thiefTable,
  [CharClasses.assassin]: thiefTable,
  [CharClasses.cleric]: clericTable,
  [CharClasses.druid]: clericTable,
  [CharClasses.monk]: clericTable,
  [CharClasses.magicUser]: wizardTable,
  [CharClasses.illusionist]: wizardTable,
};
