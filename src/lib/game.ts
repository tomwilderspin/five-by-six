export enum CharGuess {
  Hit = "hit",
  Near = "near",
  Miss = "miss",
}

const isHitChar = (guessChar: string, answerChar: string) =>
  guessChar === answerChar;


interface CheckForNearCharsProps {
  charIndx: number;
  guess: string;
  answer: string;
}
// checks for Near Chars (chars in word but in the wrong place).
// TODO: clean out the multiple pass loops as this is pretty slow.
const checkForNearChars = ({ charIndx, guess, answer }: CheckForNearCharsProps) => {
  const answerCharCounts = new Map<string, number>();
  const guessChar = guess[charIndx];

  // first pass remove exact matches.
  const NonMatchedAnswerChars = [...answer].filter((char: string, indx: number) => !isHitChar(guess[indx], char));

  // get counts for remaining answer chars.
  for (const char of [...NonMatchedAnswerChars]) {
    const currentCount = answerCharCounts.get(char);
    if (currentCount) {
      answerCharCounts.set(char, currentCount + 1);
    } else {
      answerCharCounts.set(char, 1);
    }
  }
  
  // second pass remove already guessed chars that are not correct matches.
  [...guess.substring(0, charIndx - 1)]
  .filter((char: string, indx: number) => !isHitChar(char, answer[indx]))
  .forEach((char) => {
    const currentChar = answerCharCounts.get(char);
    if (currentChar) {
      answerCharCounts.set(char, currentChar - 1);
    }
  });

  // check if guess char has positive count in near misses map.
  if (answerCharCounts.has(guessChar)) {
    return (answerCharCounts.get(guessChar) || 0) > 0 ? CharGuess.Near : CharGuess.Miss;
  }
  return CharGuess.Miss;
}

export const checkGuessChar = (
  charIndx: number,
  guess: string,
  answer: string
) => {
  const guessChar = guess[charIndx];
  const answerChar = answer[charIndx];

  // check if char is in bounds
  if (!guessChar || !answerChar) {
    return CharGuess.Miss;
  }
  //check if char is a hit.
  if (isHitChar(guessChar, answerChar)) {
    return CharGuess.Hit;
  }
  //check for near (right char, wrong place)
  return checkForNearChars({ charIndx, guess, answer });
};
