/** @format */

import { Dispatch, SetStateAction } from "react";

type InputBoxProps = {
  value: string | number;
  onChange: React.Dispatch<React.SetStateAction<string>>;
};

const InputBox = ({ value, onChange }: InputBoxProps) => {
  return (
    <div className="w-full  flex items-start justify-start">
      <input
        className="w-full rounded-md text-lg px-2 py-2 outline-none bg-slate-100 dark:bg-slate-600"
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default InputBox;
