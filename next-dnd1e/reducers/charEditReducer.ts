import { CharSheet } from "../dndFirstEdSim/Character";
import { CharClasses } from "../dndFirstEdSim/data/classes";
import { WeaponTypes } from "../dndFirstEdSim/data/weapons";

export enum CharEditType {
  SET_CHAR_NAME = "charName",
  SET_CHAR_CLASS = "charClass",
  SET_CHAR_LEVEL = "charLvl",
  SET_CHAR_TOHIT_BONUS = "charToHitBonus",
  SET_CHAR_DAMAGE_BONUS = "charDmgBonus",
  SET_WEAPON_NAME = "wpnName",
  SET_WEAPON_TYPE = "wpnType",
  SET_WEAPON_MAGIC_BONUS = "wpnMagicBonus",
}

interface SetCharName {
  type: CharEditType.SET_CHAR_NAME;
  value: string;
}
interface SetCharClass {
  type: CharEditType.SET_CHAR_CLASS;
  value: CharClasses;
}
interface SetCharLevel {
  type: CharEditType.SET_CHAR_LEVEL;
  value: number;
}
interface SetCharToHit {
  type: CharEditType.SET_CHAR_TOHIT_BONUS;
  value: number;
}
interface SetCharDmg {
  type: CharEditType.SET_CHAR_DAMAGE_BONUS;
  value: number;
}
interface SetWeaponName {
  type: CharEditType.SET_WEAPON_NAME;
  value: string;
}
interface SetWeaponType {
  type: CharEditType.SET_WEAPON_TYPE;
  value: WeaponTypes;
}
interface SetWeaponMagicBonus {
  type: CharEditType.SET_WEAPON_MAGIC_BONUS;
  value: number;
}

export type CharEditAction =
  | SetCharName
  | SetCharClass
  | SetCharLevel
  | SetCharToHit
  | SetCharDmg
  | SetWeaponName
  | SetWeaponType
  | SetWeaponMagicBonus;

export function charEditReducer(
  state: CharSheet,
  action: CharEditAction
): CharSheet {
  switch (action.type) {
    case CharEditType.SET_CHAR_NAME:
      return { ...state, weapon: { ...state.weapon }, name: action.value };
    case CharEditType.SET_CHAR_CLASS:
      return { ...state, weapon: { ...state.weapon }, charClass: action.value };
    case CharEditType.SET_CHAR_LEVEL:
      return { ...state, weapon: { ...state.weapon }, level: action.value };
    case CharEditType.SET_CHAR_TOHIT_BONUS:
      return {
        ...state,
        weapon: { ...state.weapon },
        toHitBonus: action.value,
      };
    case CharEditType.SET_CHAR_DAMAGE_BONUS:
      return {
        ...state,
        weapon: { ...state.weapon },
        damageBonus: action.value,
      };
    case CharEditType.SET_WEAPON_NAME:
      return { ...state, weapon: { ...state.weapon, name: action.value } };
    case CharEditType.SET_WEAPON_TYPE:
      return { ...state, weapon: { ...state.weapon, type: action.value } };
    case CharEditType.SET_WEAPON_MAGIC_BONUS:
      return {
        ...state,
        weapon: { ...state.weapon, magicalBonus: action.value },
      };
  }
}
