import { FC, PropsWithChildren, createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const GameDataKey = "fivebysix-gamedata-v1";

interface GameData {
  games: Record<string, { guesses: string[] }>;
}
const dataDefaults: GameData = { games: {} };

const useGameDataStore = () => {
  const { storedData, setStoredData } = useLocalStorage<GameData>(
    GameDataKey,
    dataDefaults
  );
  return { storedData, setStoredData };
};

export const GameDataContext = createContext<ReturnType<
  typeof useGameDataStore
> | null>(null);

const GameDataProvider: FC<PropsWithChildren> = ({ children }) => {
  const store = useGameDataStore();
  return (
    <GameDataContext.Provider value={store}>
      {children}
    </GameDataContext.Provider>
  );
};

const useGameData = () => {
  const {storedData, setStoredData } = useContext(GameDataContext) || {};
  if (storedData === undefined || setStoredData === undefined) {
    throw new Error("must be used within GameDataProvider");
  }
  return {
    gameData: storedData,
    setGameData: setStoredData,
  };
};
// eslint-disable-next-line react-refresh/only-export-components
export { useGameData, GameDataProvider };
