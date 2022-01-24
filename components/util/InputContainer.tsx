/** @format */

type InputContainerProps = {
  children: React.ReactElement | React.ReactElement[];
};

const InputContainer = ({ children }: InputContainerProps) => {
  return (
    <div className="w-full md:max-w-3xl flex flex-col gap-1 py-2 ">
      {children}
    </div>
  );
};

export default InputContainer;
