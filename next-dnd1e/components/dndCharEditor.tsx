import {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { Character, CharSheet } from "../dndFirstEdSim/Character";
import { CharClasses } from "../dndFirstEdSim/data/classes";
import { weapons } from "../dndFirstEdSim/data/weapons";
import { Weapon } from "../dndFirstEdSim/Weapon";
import { CharActionsEnum, charReducer } from "../reducers/charReducer";
import styles from "../styles/Home.module.css";
import {
  deleteCharInLocalStorage,
  saveCharToLocalStorage,
} from "../utils/storage";

interface Props {
  charSheet: CharSheet;
  removeCharFromList: (uuid: string) => void;
}

export const CharEditor: FunctionComponent<Props> = ({
  charSheet,
  removeCharFromList,
}) => {
  const [charState, charDispatch] = useReducer(
    charReducer,
    new Character(
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
    )
  );

  const dialogRef = useRef<any>(null);

  useEffect(() => {
    saveCharToLocalStorage(charState);
  }, [charState]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const type = e.currentTarget.name as CharActionsEnum;
    let value: any =
      e.currentTarget.type === "number"
        ? Number(e.currentTarget.value)
        : e.currentTarget.value;

    if (typeof value === "number" && value < 0) value = 0;

    charDispatch({ type, value });
  };

  const deleteChar = () => {
    deleteCharInLocalStorage(charState.uuid);
    removeCharFromList(charState.uuid);
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
        <div>uuid: {charState.uuid}</div>

        <div>
          <label htmlFor={CharActionsEnum.SET_CHAR_NAME}>name: </label>
          <input
            name={CharActionsEnum.SET_CHAR_NAME}
            type="text"
            value={charState.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <select
            name={CharActionsEnum.SET_CHAR_CLASS}
            value={charState.charClass}
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
          <label htmlFor={CharActionsEnum.SET_CHAR_LEVEL}>level: </label>
          <input
            name={CharActionsEnum.SET_CHAR_LEVEL}
            id={CharActionsEnum.SET_CHAR_LEVEL}
            type="number"
            value={charState.level}
            onChange={handleChange}
            style={{ width: "3rem" }}
          />
        </div>

        <div>thac0: {charState.thac0}</div>

        <div>
          <select
            name={CharActionsEnum.SET_WEAPON_TYPE}
            value={charState.weapon.type}
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
            name={CharActionsEnum.SET_WEAPON_NAME}
            type="text"
            value={charState.weapon.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor={CharActionsEnum.SET_WEAPON_MAGIC_BONUS}>
            magic-bonus:{" "}
          </label>
          <input
            name={CharActionsEnum.SET_WEAPON_MAGIC_BONUS}
            type="number"
            value={charState.weapon.magicalBonus}
            onChange={handleChange}
            style={{ width: "3rem" }}
          />
        </div>

        <div>
          weaponDmg:
          <div>
            S/M: {charState.weapon.damageRange(false)} L:{" "}
            {charState.weapon.damageRange(true)}
          </div>
        </div>

        <div>
          {/* <button onClick={saveChar}>Save</button> */}
          <dialog ref={dialogRef}>
            <form method="dialog">
              <div>Delete character {charState.name}?</div>
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
          <button onClick={showDeleteDialog}>Delete</button>
        </div>
      </div>
    </>
  );
};
