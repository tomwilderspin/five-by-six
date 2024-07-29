import { FC } from "react";
import { CharGuess } from "../lib/gameConstants";
import { charGuessToColour } from "../lib/game";

interface WordGridProps {
  maxRows: number;
  wordLength: number;
  currentWord: string;
  currentAttempt: number;
  guesses: string[];
  onCheckGuessLetter: (CharPosition: number, guess: string) => CharGuess;
}

export const WordGrid: FC<WordGridProps> = ({
  maxRows,
  wordLength,
  currentAttempt,
  currentWord,
  guesses,
  onCheckGuessLetter
}) => {
  const rows = [];
  for (let i = 0; i < maxRows; i++) {
    const guess = guesses[i] || (i === currentAttempt ? currentWord : "");
    const cells = [];
    for (let j = 0; j < wordLength; j++) {
      let bgColor = "bg-gray-900";
      const delay = (j * 2) * 0.5; // Staggered delay for each tile
      let content = <div>{guess[j] || ""}</div>;

      if (guess[j]) {
        if (i < currentAttempt) {
          const charGuess = onCheckGuessLetter(j, guess);
          if (charGuess) {
            bgColor = charGuessToColour(charGuess);
          }
          content = (
            <div
              className={`flip-card-inner animate`}
              style={{ animationDelay: `${delay}s` }}
            >
              <div className="flip-card-front">{guess[j]}</div>
              <div className={`flip-card-back ${bgColor}`}>{guess[j]}</div>
            </div>
          );
        }
      }

      cells.push(
        <div
          key={j}
          className={`w-16 h-16 border-2 flex items-center justify-center ${bgColor} text-white text-2xl font-bold uppercase`}
        >
          {content}
        </div>
      );
    }
    rows.push(
      <div key={i} className="flex space-x-1">
        {cells}
      </div>
    );
  }
  return rows;
};
