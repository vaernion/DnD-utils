import { createContext, FC, useContext, useEffect, useReducer } from "react";
import { CharSheet } from "../dndFirstEdSim/Character";
import {
  CharStoreAction,
  charStoreReducer,
  CharStoreType,
} from "../reducers/charStoreReducer";
import { loadCharsFromLocalStorage } from "../utils/storage";

const CharStoreContext = createContext<{
  state: CharSheet[];
  dispatch: (action: CharStoreAction) => void;
}>({
  state: [],
  dispatch: () => {},
});

export const useCharStore = () => useContext(CharStoreContext);

export const CharStore: FC = ({ children }) => {
  const [state, dispatch] = useReducer(charStoreReducer, []);

  useEffect(() => {
    dispatch({
      type: CharStoreType.LOAD_CHARS,
      value: loadCharsFromLocalStorage(),
    });
  }, []);

  return (
    <>
      <CharStoreContext.Provider value={{ state, dispatch }}>
        {children}
      </CharStoreContext.Provider>
    </>
  );
};
