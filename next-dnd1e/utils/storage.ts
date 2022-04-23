import { CharSheet } from "../dndFirstEdSim/Character";

const charsKey = "chars";

export const saveCharToLocalStorage = (charToSave: CharSheet) => {
  // console.count("saving " + charToSave.uuid);
  let currentChars: CharSheet[] = [];
  try {
    const currentCharsJSON = localStorage.getItem(charsKey);

    // loading current chars
    if (currentCharsJSON) {
      try {
        const charsParsed: CharSheet[] = JSON.parse(currentCharsJSON);
        if (Array.isArray(charsParsed)) {
          currentChars = charsParsed;
        }
      } catch (err) {
        // invalid data stored, clean up
        console.error(err);
        localStorage.removeItem(charsKey);
      }
    }

    currentChars.push(charToSave);

    // prevent duplicates, newest will overwrite older with same name
    // TODO: unique ids per char, useId not usable in nextjs yet
    const charsMap: Map<string, CharSheet> = new Map();
    for (const char of currentChars) {
      charsMap.set(char.uuid, char);
    }
    const charsUnique = Array.from(charsMap.values());
    const updatedCharsJSON = JSON.stringify(charsUnique);

    // saving
    localStorage.setItem(charsKey, updatedCharsJSON);
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : err);
  }
};

export const loadCharsFromLocalStorage = (): CharSheet[] => {
  let chars: CharSheet[] = [];
  try {
    const charsJSON = localStorage.getItem(charsKey);

    if (charsJSON) {
      try {
        const charsParsed = JSON.parse(charsJSON);
        if (Array.isArray(charsParsed)) {
          chars = charsParsed;
        }
      } catch (err) {
        // invalid data stored, clean up
        console.error(err);
        localStorage.removeItem(charsKey);
      }
    }
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : err);
  }

  return chars;
};

export const loadSingleCharFromLocalStorage = (
  uuid: string
): CharSheet | null => {
  let char = loadCharsFromLocalStorage().find((char) => char.uuid === uuid);
  return char ? char : null;
};

export const deleteCharInLocalStorage = (uuid: string) => {
  let currentChars: CharSheet[] = [];
  try {
    const currentCharsJSON = localStorage.getItem(charsKey);

    // loading current chars
    if (currentCharsJSON) {
      try {
        const charsParsed: CharSheet[] = JSON.parse(currentCharsJSON);
        if (Array.isArray(charsParsed)) {
          currentChars = charsParsed;
        }
      } catch (err) {
        // invalid data stored, clean up
        console.error(err);
        localStorage.removeItem(charsKey);
      }
    }

    // remove char with given uuid
    const filteredChars = currentChars.filter((char) => char.uuid !== uuid);
    const updatedCharsJSON = JSON.stringify(filteredChars);

    // saving
    localStorage.setItem(charsKey, updatedCharsJSON);
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : err);
  }
};
