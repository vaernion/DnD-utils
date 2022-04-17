import Link from "next/link";
import { ChangeEvent, FC, useEffect, useRef } from "react";
import { Character, CharSheet } from "../dndFirstEdSim/Character";
import { CharClasses } from "../dndFirstEdSim/data/classes";
import { weapons } from "../dndFirstEdSim/data/weapons";
import { CharEditType } from "../reducers/charEditReducer";
import { CharStoreType } from "../reducers/charStoreReducer";
import styles from "../styles/Layout.module.css";
import {
  deleteCharInLocalStorage,
  saveCharToLocalStorage,
} from "../utils/storage";
import { useCharStore } from "./charStore";

interface Props {
  charSheet: CharSheet;
}

export const CharEditor: FC<Props> = ({ charSheet }) => {
  const { dispatch } = useCharStore();
  // const character = useMemo(
  //   () => Character.parseCharacterSheet(charSheet),
  //   [charSheet]
  // );
  // class instance so metods can be used for view
  const character = Character.parseCharacterSheet(charSheet);

  const dialogRef = useRef<any>(null);

  useEffect(() => {
    saveCharToLocalStorage(charSheet);
  }, [charSheet]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const editType = e.currentTarget.name as CharEditType;
    let editValue: any =
      e.currentTarget.type === "number"
        ? Number(e.currentTarget.value)
        : e.currentTarget.value;

    if (typeof editValue === "number" && editValue < 0) editValue = 0;

    dispatch({
      type: CharStoreType.EDIT_CHAR,
      value: {
        charSheet,
        charEditAction: { type: editType, value: editValue },
      },
    });
  };

  const deleteChar = () => {
    deleteCharInLocalStorage(charSheet.uuid);
    dispatch({
      type: CharStoreType.DELETE_CHAR,
      value: { uuid: charSheet.uuid },
    });
  };

  const showDeleteDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  return (
    <>
      <style jsx>{`
        div {
          color: rgb(25, 15, 59);
        }
        dialog div {
          display: flex;
          justify-content: space-between;
        }
        .btn-primary {
          color: white;
          background-color: blue;
        }
        .btn-secondary {
          color: white;
          background-color: grey;
        }
        .btn-danger {
          color: white;
          background-color: red;
        }
      `}</style>
      <div className={styles.card}>
        <div>uuid: {character.uuid}</div>

        <div>
          <label htmlFor={CharEditType.SET_CHAR_NAME}>name: </label>
          <input
            name={CharEditType.SET_CHAR_NAME}
            type="text"
            value={character.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <select
            name={CharEditType.SET_CHAR_CLASS}
            value={character.charClass}
            onChange={handleChange}
          >
            {Object.entries(CharClasses).map(([name, nameLong], i) => (
              <option key={name} value={nameLong}>
                {nameLong}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={CharEditType.SET_CHAR_LEVEL}>level: </label>
          <input
            name={CharEditType.SET_CHAR_LEVEL}
            id={CharEditType.SET_CHAR_LEVEL}
            type="number"
            value={character.level}
            onChange={handleChange}
            style={{ width: "3rem" }}
          />
        </div>

        <div>thac0: {character.thac0}</div>

        <div>
          <select
            name={CharEditType.SET_WEAPON_TYPE}
            value={character.weapon.type}
            onChange={handleChange}
          >
            {Object.entries(weapons).map(([name, weapon], i) => (
              <option key={name} value={name}>
                {name}
                {/* S/M: {weapon.diceStringSM} L: {weapon.diceStringL} */}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div>weapon:</div>
          <input
            name={CharEditType.SET_WEAPON_NAME}
            type="text"
            value={character.weapon.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor={CharEditType.SET_WEAPON_MAGIC_BONUS}>
            magic-bonus:{" "}
          </label>
          <input
            name={CharEditType.SET_WEAPON_MAGIC_BONUS}
            type="number"
            value={character.weapon.magicalBonus}
            onChange={handleChange}
            style={{ width: "3rem" }}
          />
        </div>

        <div>
          weaponDmg:
          <div>
            S/M: {character.weapon.damageRange(false)} L:{" "}
            {character.weapon.damageRange(true)}
          </div>
        </div>

        <div>
          {/* <button onClick={saveChar}>Save</button> */}
          <dialog ref={dialogRef}>
            <form method="dialog">
              <div>Delete character {character.name}?</div>
              <div>
                <button className="btn-primary" value="cancel">
                  Cancel
                </button>
                <button
                  className="btn-danger"
                  value="default"
                  onClick={deleteChar}
                >
                  Confirm
                </button>
              </div>
            </form>
          </dialog>
          <Link
            href={{ pathname: "/damage", query: { charId: character.uuid } }}
          >
            <a>Damage stats</a>
          </Link>
          <button onClick={showDeleteDialog}>Delete</button>
        </div>
      </div>
    </>
  );
};
