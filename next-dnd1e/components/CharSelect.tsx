import { ChangeEvent, FC } from "react";
import { CharSheet } from "../dndFirstEdSim/Character";
import styles from "../styles/Layout.module.css";
import { useCharStore } from "./charStore";

type Props = {
  label: string;
  activeCharId: string;
  onCharChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  charFilter?: (char: CharSheet) => boolean;
};

export const CharSelect: FC<Props> = ({
  label,
  activeCharId,
  onCharChange,
  charFilter = () => true,
}) => {
  const { state } = useCharStore();

  return (
    <div className={styles.card}>
      <div>
        <label htmlFor={label.split(" ")[0]}>
          <small>{label}</small>
        </label>
      </div>
      <select
        id={label.split(" ")[0]}
        value={activeCharId}
        onChange={onCharChange}
      >
        <option value="">None</option>
        <optgroup label="Characters">
          {state.filter(charFilter).map((char) => (
            <option key={char.uuid} value={char.uuid}>
              {char.name} {char.charClass} {char.level}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
};
