import { Character } from "../dndFirstEdSim/Character";
import { CharClasses } from "../dndFirstEdSim/data/classes";
import { WeaponTypes } from "../dndFirstEdSim/data/weapons";
import { Weapon } from "../dndFirstEdSim/Weapon";

export enum CharActionsEnum {
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
  type: CharActionsEnum.SET_CHAR_NAME;
  value: string;
}
interface SetCharClass {
  type: CharActionsEnum.SET_CHAR_CLASS;
  value: CharClasses;
}
interface SetCharLevel {
  type: CharActionsEnum.SET_CHAR_LEVEL;
  value: number;
}
interface SetCharToHit {
  type: CharActionsEnum.SET_CHAR_TOHIT_BONUS;
  value: number;
}
interface SetCharDmg {
  type: CharActionsEnum.SET_CHAR_DAMAGE_BONUS;
  value: number;
}
interface SetWeaponName {
  type: CharActionsEnum.SET_WEAPON_NAME;
  value: string;
}
interface SetWeaponType {
  type: CharActionsEnum.SET_WEAPON_TYPE;
  value: WeaponTypes;
}
interface SetWeaponMagicBonus {
  type: CharActionsEnum.SET_WEAPON_MAGIC_BONUS;
  value: number;
}

type CharAction =
  | SetCharName
  | SetCharClass
  | SetCharLevel
  | SetCharToHit
  | SetCharDmg
  | SetWeaponName
  | SetWeaponType
  | SetWeaponMagicBonus;

export function charReducer(state: Character, action: CharAction): Character {
  let { uuid, name, charClass, level, toHitBonus, damageBonus } = state;
  let {
    name: weaponName,
    type: weaponType,
    magicalBonus: weaponMagicalBonus,
  } = state.weapon;

  switch (action.type) {
    case CharActionsEnum.SET_CHAR_NAME:
      name = action.value;
      break;
    case CharActionsEnum.SET_CHAR_CLASS:
      charClass = action.value;
      break;
    case CharActionsEnum.SET_CHAR_LEVEL:
      level = action.value;
      break;
    case CharActionsEnum.SET_CHAR_TOHIT_BONUS:
      toHitBonus = action.value;
      break;
    case CharActionsEnum.SET_CHAR_DAMAGE_BONUS:
      damageBonus = action.value;
      break;
    case CharActionsEnum.SET_WEAPON_NAME:
      weaponName = action.value;
      break;
    case CharActionsEnum.SET_WEAPON_TYPE:
      weaponType = action.value;
      break;
    case CharActionsEnum.SET_WEAPON_MAGIC_BONUS:
      weaponMagicalBonus = action.value;
      break;
    default:
      // can't use dynamic check against never without early return
      throw new Error(`action type not added to charReducer`);
  }

  return new Character(
    uuid,
    name,
    charClass,
    level,
    toHitBonus,
    damageBonus,
    new Weapon(weaponName, weaponType, weaponMagicalBonus)
  );
}
