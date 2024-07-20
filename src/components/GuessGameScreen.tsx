import { useState, useEffect, FC } from "react";
import Keyboard from "./Keyboard";
import { WordGrid } from "./WordGrid";

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

interface GuessGameScreenProps {
  answer: string;
}

const GuessGameScreen: FC<GuessGameScreenProps> = ({ answer }) => {
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");

  const handleKeyPress = (key: string) => {
    if (status !== "playing") return;

    if (key === "ENTER") {
      if (currentWord.length === WORD_LENGTH) {
        setGuesses([...guesses, currentWord]);
        setCurrentAttempt(currentAttempt + 1);

        if (currentWord === answer) {
          setStatus("won");
        } else if (currentAttempt + 1 === MAX_ATTEMPTS) {
          setStatus("lost");
        }
        setCurrentWord("");
      }
    } else if (key === "backspace") {
      setCurrentWord(currentWord.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(key) && currentWord.length < WORD_LENGTH) {
      setCurrentWord(currentWord + key.toLowerCase());
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => handleKeyPress(event.key);
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentWord, currentAttempt, status]);

  return (
    <>
      <div className="grid gap-2">
        <WordGrid
          maxRows={MAX_ATTEMPTS}
          wordLength={WORD_LENGTH}
          guesses={guesses}
          answer={answer}
          currentAttempt={currentAttempt}
          currentWord={currentWord}
        />
      </div>
      {status !== "playing" && (
        <div className="mt-8 text-2xl">
          {status === "won"
            ? "Congratulations! You won!"
            : `Game Over! The word was ${answer.toUpperCase()}. Try again!`}
        </div>
      )}
      <Keyboard onKeyPress={handleKeyPress} />
    </>
  );
};

export default GuessGameScreen;