export enum CharGuess {
  Hit = "hit",
  Near = "near",
  Miss = "miss",
}

export enum GuessColour {
  Miss = "bg-gray-500",
  Hit = "bg-green-500",
  Near = "bg-yellow-500",
  Used = "bg-grey-700",
}

export enum GameStatus {
  Playing = "playing",
  Won = "won",
  Lost = "lost",
}

export const WORD_LENGTH = 5;
export const MAX_ATTEMPTS = 6;