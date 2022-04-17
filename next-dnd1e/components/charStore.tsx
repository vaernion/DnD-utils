import { createContext, FC, useContext, useReducer } from "react";
import { CharSheet } from "../dndFirstEdSim/Character";
import {
  CharStoreAction,
  charStoreReducer,
} from "../reducers/charStoreReducer";

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

  return (
    <>
      <CharStoreContext.Provider value={{ state, dispatch }}>
        {children}
      </CharStoreContext.Provider>
    </>
  );
};
