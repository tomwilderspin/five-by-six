import { FC, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface ShareLinkProps {
  link: string;
}

const ShareLink: FC<ShareLinkProps> = ({ link }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-3xl font-bold mb-8">
        Share this link with your victim to play:
      </h3>
      <textarea
        value={link}
        readOnly
        className="mt-2 h-auto min-h-[50px] w-full resize-none rounded border border-gray-200 border-t-transparent bg-transparent p-3 font-bold outline transition-all focus:border focus:border-gray-900 focus:border-t-transparent"
      ></textarea>
      <CopyToClipboard text={link} onCopy={() => setCopied(true)}>
        <button className=" mt-3 py-3 px-4 bg-gray-700 text-white rounded flex items-center justify-center text-lg font-semibold">
          Copy link to clipboard
        </button>
      </CopyToClipboard>
      {copied && <small>link copied!</small>}
    </div>
  );
};

export default ShareLink;
