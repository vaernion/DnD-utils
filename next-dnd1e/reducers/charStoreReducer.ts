import { CharSheet } from "../dndFirstEdSim/Character";
import { CharEditAction, charEditReducer } from "./charEditReducer";

export enum CharStoreType {
  ADD_CHAR,
  DELETE_CHAR,
  EDIT_CHAR,
  LOAD_CHARS,
}

interface AddChar {
  type: CharStoreType.ADD_CHAR;
  value: CharSheet;
}

interface DeleteChar {
  type: CharStoreType.DELETE_CHAR;
  value: { uuid: string };
}

interface EditChar {
  type: CharStoreType.EDIT_CHAR;
  value: { charSheet: CharSheet; charEditAction: CharEditAction };
}

interface LoadChars {
  type: CharStoreType.LOAD_CHARS;
  value: CharSheet[];
}

export type CharStoreAction = AddChar | DeleteChar | EditChar | LoadChars;

export function charStoreReducer(
  state: CharSheet[],
  action: CharStoreAction
): CharSheet[] {
  switch (action.type) {
    case CharStoreType.ADD_CHAR:
      return [...state, action.value];
    case CharStoreType.DELETE_CHAR:
      return [...state].filter((char) => char.uuid !== action.value.uuid);
    case CharStoreType.EDIT_CHAR:
      const chars = [...state];
      const editedCharIndex = chars.findIndex(
        (e) => e.uuid === action.value.charSheet.uuid
      );
      const editedChar = charEditReducer(
        action.value.charSheet,
        action.value.charEditAction
      );
      // retain order by overwriting same array index
      chars[editedCharIndex] = editedChar;
      return chars;
    case CharStoreType.LOAD_CHARS:
      return [...action.value];
  }
}
