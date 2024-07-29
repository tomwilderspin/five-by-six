import { FC } from "react";
import "./App.css";
import GuessGameScreen from "./components/GuessGameScreen";
import { decode } from "base-64";
import NewAnswerScreen from "./components/NewAnswerScreen";
import { enqueueSnackbar } from "notistack";

const ANSWER_KEY = "ans";
// TODO: generate this on build / deploy.
const VERSION_ID = "v0.2.1";

const App: FC = () => {
  const params = new URLSearchParams(window.location.search || "");
  let answer = "";
  let gameId = "";
  try {
    const answerParam = params.get(ANSWER_KEY) ?? "";
    const [answerVal, gameQueryId] = answerParam ? decode(answerParam).split(":") : [];
    answer = answerVal;
    gameId = gameQueryId;
    if (answer && answer.replace(/[^a-z]/g, "").length !== 5) {
      throw new Error("malformed query payload");
    }
    if (answer && !gameId) {
      throw new Error("missing game ID!");
    }
  } catch (err) {
    enqueueSnackbar(
      "Whoops! there's an error in the game link, have you pasted it in correctly?",
      { variant: "error", autoHideDuration: 3000 }
    );
    console.error("malformed answer", err);
  }
  const content = answer ? (
    <GuessGameScreen answer={answer} gameId={gameId} />
  ) : (
    <NewAnswerScreen />
  );
  return (
    <main className="my-3 mx-auto h-screen flex flex-col items-center justify-center bg-gray-900 text-white max-w-[500px]">
      <h1 className="text-5xl font-bold mb-8">FIVE BY SIX</h1>
      <div className="px-2 w-full">{content}</div>
      <small className="mt-1 w-full text-center">version {VERSION_ID}</small>
    </main>
  );
};

export default App;
