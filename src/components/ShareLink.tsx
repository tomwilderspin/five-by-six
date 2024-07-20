import { FC } from "react";

interface ShareLinkProps {
  link: string;
}

const ShareLink: FC<ShareLinkProps> = ({ link }) => {
  return (
    <div>
      <h3 className="text-3xl font-bold mb-8">
        Share this link with your victim to play:
      </h3>
      <textarea className="mt-2 h-full min-h-[50px] w-full resize-none rounded border border-gray-200 border-t-transparent bg-transparent p-3 font-bold outline transition-all focus:border focus:border-gray-900 focus:border-t-transparent">
        {link}
      </textarea>
    </div>
  );
};

export default ShareLink;
