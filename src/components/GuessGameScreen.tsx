import { useState, useEffect, FC } from "react";
import Keyboard from "./Keyboard";
import { WordGrid } from "./WordGrid";
import { wordList } from "../lib/wordlist";
import { enqueueSnackbar } from "notistack";
import { useConfetti } from "../hooks/confetti";
import { useGameData } from "../context/gameData";
import { CharGuess, GameStatus, MAX_ATTEMPTS, WORD_LENGTH } from "../lib/gameConstants";
import { checkGuessChar } from "../lib/game";

interface GuessGameScreenProps {
  answer: string;
  gameId: string;
}

const GuessGameScreen: FC<GuessGameScreenProps> = ({ answer, gameId }) => {
  const { gameData, setGameData } = useGameData();
  const [currentWord, setCurrentWord] = useState("");
  const [status, setStatus] = useState<GameStatus>(GameStatus.Playing);
  const { windowConfetti } = useConfetti();
  const { games } = gameData;
  const lettersToGuessMap = new Map<string, CharGuess>();
  let guesses: string[] = [];
  let currentAttempt: number = 0;
  if (games && games[gameId]) {
    guesses = games[gameId].guesses || [];
    currentAttempt = guesses.length;
  }
  const setGuesses = (updatedGuesses: string[]) => {
    setGameData({
      games: { ...games, [gameId]: { guesses: updatedGuesses } },
    });
  };

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

        if (currentWord === answer) {
          setStatus(GameStatus.Won);
        } else if (currentAttempt + 1 === MAX_ATTEMPTS) {
          setStatus(GameStatus.Lost);
        }
        setCurrentWord("");
      }
    } else if (key === "Backspace") {
      setCurrentWord(currentWord.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(key) && currentWord.length < WORD_LENGTH) {
      setCurrentWord(currentWord + key.toLowerCase());
    }
  };

  const onCheckGuessLetter = (charIndx: number, guess: string) => {
    const guessLetter = guess[charIndx];
    const charGuess = checkGuessChar(charIndx, guess, answer);
    if (guessLetter) {
      lettersToGuessMap.set(guessLetter, charGuess);
    }
    return charGuess;
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => handleKeyPress(event.key);
    window.addEventListener("keydown", handleKeyDown);
    if (guesses.length && guesses[guesses.length - 1] === answer) {
      setStatus(GameStatus.Won);
    }
    if (guesses.length === 6 && guesses[guesses.length - 1] !== answer ) {
      setStatus(GameStatus.Lost);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentWord, currentAttempt, status]);

  return (
    <div className="w-full flex flex-col items-center">
      {status === "won" && windowConfetti}
      <div className="grid gap-2">
        <WordGrid
          onCheckGuessLetter={onCheckGuessLetter}
          maxRows={MAX_ATTEMPTS}
          wordLength={WORD_LENGTH}
          guesses={guesses}
          currentAttempt={currentAttempt}
          currentWord={currentWord}
        />
      </div>
      {status !== GameStatus.Playing && (
        <div className="flex flex-col items-center">
          <div className="mt-8 text-2xl text-center">
            {status === GameStatus.Won
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
      <Keyboard onKeyPress={handleKeyPress} letterGuessMap={lettersToGuessMap} />
    </div>
  );
};

export default GuessGameScreen;
