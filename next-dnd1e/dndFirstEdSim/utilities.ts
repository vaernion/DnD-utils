import { WeaponTypes } from "./data/weapons";

type KillDescriptions = {
  [k in WeaponTypes]: string[];
};

const descriptions: KillDescriptions = {
  [WeaponTypes.longsword]: ["cut down", "stabbed", "slashed", "outskilled"],
  [WeaponTypes.shortsword]: ["stabbed", "slashed"],
  [WeaponTypes.twohanded]: [
    "decapitated",
    "executed",
    "gibbed",
    "split in half",
  ],
  [WeaponTypes.battleaxe]: ["disembowled", "Gimli'd"],
  [WeaponTypes.morningstar]: ["skullcrushed", "punctured", "spiked"],
  [WeaponTypes.lucerne]: ["swiped", "hammered"],
  [WeaponTypes.fist]: ["fisted", "knocked out", "smashed", "punched to death"],
  [WeaponTypes.superMonkFist]: ["superfisted", "ripped apart", "broken"],
};

export function randomKillDescription(weapon: WeaponTypes) {
  const weaponDescriptions = descriptions[weapon];

  return weaponDescriptions[
    Math.floor(Math.random() * weaponDescriptions.length)
  ];
}
