/** @format */

type SignOnButton = {
  signInFunction: () => void;
  children: React.ReactElement | React.ReactElement[] | string;
};

const SignOnButton = ({ signInFunction, children }: SignOnButton) => {
  return (
    <button
      className="border-none outline-none px-2 py-2 bg-slate-100 dark:bg-slate-600 rounded-lg shadow-md shadow-slate-600/15 md:hover:-translate-y-0.5"
      onClick={signInFunction}
    >
      {children}
    </button>
  );
};
export default SignOnButton;
