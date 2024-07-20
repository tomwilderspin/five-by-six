import { FC, useState } from "react";
import AnswerInput from "./AnswerInput";
import { encode } from "base-64";
import ShareLink from "./ShareLink";

interface NewAnswerScreenProps {}
const NewAnswerScreen: FC<NewAnswerScreenProps> = () => {
  const [shareLink, setShareLink] = useState('');
  const { host, protocol } = window.location || {};
  const baseUrl = `${protocol}//${host}/`;

  const handleGenerateLink = (word: string) => {
    const encodedAnswer = encode(`${word}:${Date.now()}`);
    const link = `${baseUrl}?ans=${encodedAnswer}`;
    setShareLink(link);
  }

  if (shareLink) {
    return (
      <ShareLink link={shareLink} />
    );
  }

  return (
    <>
      <h2>Enter a new Word to guess.</h2>
      <div className="mt-4 w-full max-w-[400px]">
        <AnswerInput handleSubmit={handleGenerateLink} />
      </div>
    </>
  );
};

export default NewAnswerScreen;
