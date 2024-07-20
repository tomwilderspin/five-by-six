import React from 'react';

const keys = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'backspace'],
];

interface KeyboardProps {
  onKeyPress: (key: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress }) => {
  return (
    <div className="mt-8 mx-2 space-y-2 w-full">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="mx-auto flex  mb-2 w-full">
          {rowIndex % 2 !== 0 && (
            <div id='spacer' className='flex' style={{ flexGrow: '0.5' }}></div>
          )}
          {row.map((key) => (
            <button
              key={key}
              className="h-16 mr-1 bg-gray-700 text-white rounded flex grow items-center justify-center text-lg font-semibold"
              onClick={() => onKeyPress(key)}
            >
              {key === 'backspace' ? '⌫' : key}
            </button>
          ))}
          {rowIndex % 2 !== 0 && (
            <div id='spacer-end' className='flex' style={{ flexGrow: '0.5' }}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
