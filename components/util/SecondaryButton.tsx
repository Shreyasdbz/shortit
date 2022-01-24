/** @format */

type SecondaryButtonProps = {
  onClick: () => void;
  children:
    | React.ReactElement
    | React.ReactElement[]
    | string
    | string[]
    | (React.ReactElement | string)[];
};

const SecondaryButton = ({ onClick, children }: SecondaryButtonProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center py-4 ">
      <button
        className="flex flex-row items-center h-full justify-center px-2  rounded-xl text-slate-100 bg-cyan-500 shadow-lg shadow-cyan-500/25 hover:opacity-90"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default SecondaryButton;
