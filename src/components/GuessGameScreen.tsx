import { useState, useEffect, FC } from "react";
import Keyboard from "./Keyboard";
import { WordGrid } from "./WordGrid";
import { wordList } from "../lib/wordlist";
import { enqueueSnackbar } from "notistack";
import { useConfetti } from "../hooks/confetti";

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
  const { windowConfetti } = useConfetti();

  const handleNewGame = () => {
    const { host, protocol } = window.location || {};
    const url = `${protocol}//${host}`;
    window.location.href = url;
  };
  const handleKeyPress = (key: string) => {
    if (status !== "playing") return;
    if (key === "Enter") {
      if (!wordList.includes(currentWord)) {
        return enqueueSnackbar("Not in word list", { variant: "default" });
      }
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
    } else if (key === "Backspace") {
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
    <div className="w-full flex flex-col items-center">
      {status === "won" && windowConfetti}
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
        <div className="flex flex-col items-center">
          <div className="mt-8 text-2xl text-center">
            {status === "won"
              ? `Congratulations! You got it right, "${answer.toUpperCase()}"`
              : `Game over! The word was "${answer.toUpperCase()}". Try again next time!`}
          </div>
          <button
            onClick={handleNewGame}
            className="mt-8 py-2 px-4 bg-gray-700 text-white rounded flex items-center justify-center text-md font-semibold"
          >
            New game
          </button>
        </div>
      )}
      <Keyboard onKeyPress={handleKeyPress} />
    </div>
  );
};

export default GuessGameScreen;
