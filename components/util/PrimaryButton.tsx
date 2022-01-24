/** @format */

type PrimaryButtonProps = {
  children:
    | React.ReactElement
    | React.ReactElement[]
    | string
    | string[]
    | (React.ReactElement | string)[];
};

const PrimaryButton = ({ children }: PrimaryButtonProps) => {
  return (
    <button className="flex flex-row items-center h-full justify-center px-2  bg-indigo-500 rounded-lg">
      {children}
    </button>
  );
};

export default PrimaryButton;
