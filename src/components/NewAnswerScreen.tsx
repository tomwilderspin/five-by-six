import { FC, useState } from "react";
import AnswerInput from "./AnswerInput";
import { encode } from "base-64";
import ShareLink from "./ShareLink";
import { enqueueSnackbar } from "notistack";
import { wordList } from "../lib/wordlist";

interface NewAnswerScreenProps {}
const NewAnswerScreen: FC<NewAnswerScreenProps> = () => {
  const [shareLink, setShareLink] = useState("");
  const { host, protocol } = window.location || {};
  const baseUrl = `${protocol}//${host}/`;

  const handleGenerateLink = (word: string) => {
    if (word.length !== 5) {
      return enqueueSnackbar("5 letter word required", { variant: "error" });
    }
    if (!wordList.includes(word.toLowerCase())) {
      return enqueueSnackbar("Not in word list", { variant: "error" });
    }
    const encodedAnswer = encode(`${word}:${Date.now()}`);
    const link = `${baseUrl}?ans=${encodedAnswer}`;
    setShareLink(link);
  };

  if (shareLink) {
    return <ShareLink link={shareLink} />;
  }

  return (
    <div className="mt-3 w-full flex flex-col justify-center">
      <h2 className="mb-2 text-center">Enter a new Word to guess.</h2>
      <AnswerInput handleSubmit={handleGenerateLink} />
    </div>
  );
};

export default NewAnswerScreen;
