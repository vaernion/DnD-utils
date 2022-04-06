import { FixedLengthArray } from "../utilTypes";

export enum WeaponTypes {
  longsword = "Longsword",
  shortsword = "Shortsword",
  twohanded = "Two-Handed Sword",
  fist = "Fist",
  superMonkFist = "SuperMonkFist",
}

interface WeaponInfo {
  diceStringSM: string;
  diceStringL: string;
  // ac2 to ac10
  acAdjustments: FixedLengthArray<9, number>;
}

type Weapons = Record<WeaponTypes, WeaponInfo>;

export const weapons: Weapons = {
  [WeaponTypes.longsword]: {
    diceStringSM: "1d8",
    diceStringL: "1d12",
    acAdjustments: [-2, -1, 0, 0, 0, 0, 0, 1, 2] as const,
  },
  [WeaponTypes.shortsword]: {
    diceStringSM: "1d6",
    diceStringL: "1d8",
    acAdjustments: [-3, -2, -1, 0, 0, 0, 1, 0, 2] as const,
  },
  [WeaponTypes.twohanded]: {
    diceStringSM: "1d10",
    diceStringL: "3d6",
    acAdjustments: [2, 2, 2, 2, 3, 3, 3, 1, 0] as const,
  },
  [WeaponTypes.fist]: {
    diceStringSM: "1d2",
    diceStringL: "1d2",
    acAdjustments: [-7, -5, -3, -1, 0, 0, 2, 0, 4] as const,
  },
  [WeaponTypes.superMonkFist]: {
    diceStringSM: "6d4",
    diceStringL: "6d4",
    acAdjustments: [-7, -5, -3, -1, 0, 0, 2, 0, 4] as const,
  },
};
