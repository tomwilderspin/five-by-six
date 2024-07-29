import { FC } from "react";

interface KeyButtonProps {
  keyColour: string;
  keyLabel: string;
  onKeyPress: (key: string) => void;
}

const KeyButton: FC<KeyButtonProps> = ({ keyColour, keyLabel, onKeyPress }) => {
  return (
    <button
      className={`h-16 mr-1 ${keyColour} text-white rounded flex grow items-center justify-center text-lg font-semibold border border-white`}
      onClick={() => onKeyPress(keyLabel)}
    >
      {keyLabel === "Backspace" ? "⌫" : keyLabel.toUpperCase()}
    </button>
  );
};

export default KeyButton;
