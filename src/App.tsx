import { FC } from "react";
import "./App.css";
import GuessGameScreen from "./components/GuessGameScreen";
import { decode } from "base-64";
import NewAnswerScreen from "./components/NewAnswerScreen";

const ANSWER_KEY = "ans";

const App: FC = () => {
  const params = new URLSearchParams(window.location.search || "");
  let answer = "";
  try {
    const answerParam = params.get(ANSWER_KEY) ?? "";
    const [answerVal] = answerParam ? decode(answerParam).split(":") : [];
    answer = answerVal;
  } catch (err) {
    console.error("failed to fetch answer val", err);
  }
  const content = answer ? <GuessGameScreen answer={answer} /> : <NewAnswerScreen />;
  return (
    <main className=" mx-auto h-screen flex flex-col items-center justify-center bg-gray-900 text-white max-w-[500px]">
      <h1 className="text-5xl font-bold mb-8">FIVE BY SIX</h1>
      {content}
    </main>
  );
};

export default App;
