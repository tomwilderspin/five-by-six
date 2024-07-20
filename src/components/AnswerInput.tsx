import { FC, useState } from "react";

interface AnswerInputProps {
  handleSubmit: (val: string) => void;
}

const AnswerInput: FC<AnswerInputProps> = ({ handleSubmit }) => {
  const [value, setValue] = useState("");

  const handleInputChange = (val: string) => {
    if (val.length < 6) {
      setValue(val);
    }
  };

  const onSubmit = () => {
    if (value.length === 5) { 
      handleSubmit(value);
    }
  };

  return (
    <div className="mb-4 mx-auto w-full">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <label
          className="block text-gray-200 text-sm font-bold mb-2"
          htmlFor="answer"
        >
          New guess
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="answer"
          type="text"
          placeholder="Enter your five letter word"
          onChange={(event) => handleInputChange(event.target.value || "")}
          value={value}
          max={5}
          min={1}
        />
        <button type="submit" className=" mt-3 p-3 bg-gray-700 text-white rounded flex grow items-center justify-center text-lg font-semibold">Create link</button>
      </form>
    </div>
  );
};

export default AnswerInput;
