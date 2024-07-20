import { FC } from "react";

interface WordGridProps {
  maxRows: number;
  wordLength: number;
  currentWord: string;
  currentAttempt: number;
  guesses: string[];
  answer: string;
}

export const WordGrid: FC<WordGridProps> = ({
  maxRows,
  answer,
  wordLength,
  currentAttempt,
  currentWord,
  guesses,
}) => {
  console.log('current word', currentWord);
  const rows = [];
  for (let i = 0; i < maxRows; i++) {
    const guess = guesses[i] || (i === currentAttempt ? currentWord : "");
    const cells = [];
    for (let j = 0; j < wordLength; j++) {
      let bgColor = "bg-gray-900";
      const delay = j * 0.5; // Staggered delay for each tile
      let content = (<div>{guess[j] || ""}</div>);
      if (guess[j]) {
        if (i < currentAttempt) {
          if (guess[j] === answer[j]) {
            bgColor = "bg-green-500";
          } else if (answer.includes(guess[j])) {
            bgColor = "bg-yellow-500";
          } else {
            bgColor = "bg-gray-500";
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
