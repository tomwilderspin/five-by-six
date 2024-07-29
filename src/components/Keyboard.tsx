import React from "react";
import KeyButton from "./KeyButton";
import { CharGuess, GuessColour } from "../lib/gameConstants";
import { charGuessToColour } from "../lib/game";

const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
];

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  letterGuessMap: Map<string, CharGuess>;
}
const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, letterGuessMap }) => {
  const getKeyColour = (key: string) => {
    const usedLetters = Array.from(letterGuessMap.keys());
    if (usedLetters.includes(key.toLocaleLowerCase())) {
      const charGuess = letterGuessMap.get(key.toLowerCase()) || CharGuess.Miss;
      return charGuess === CharGuess.Miss
        ? GuessColour.Used
        : charGuessToColour(charGuess);
    }
    return GuessColour.Miss;
  };
  return (
    <div className="mt-8 space-y-2 w-full">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="mx-auto flex  mb-2 w-full">
          {rowIndex % 2 !== 0 && (
            <div id="spacer" className="flex" style={{ flexGrow: "0.5" }}></div>
          )}
          {row.map((key) => (
            <KeyButton
              keyColour={getKeyColour(key)}
              key={key}
              keyLabel={key}
              onKeyPress={onKeyPress}
            />
          ))}
          {rowIndex % 2 !== 0 && (
            <div
              id="spacer-end"
              className="flex"
              style={{ flexGrow: "0.5" }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
