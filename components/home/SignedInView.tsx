/** @format */

import { firebase_auth } from "../../config/firebase";

type SignedInViewProps = {
  onOpen: () => void;
};

const SignedInView = ({ onOpen }: SignedInViewProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-10 mt-10 mb-10">
      <button
        className="border-none outline-none text-lg font-semibold bg-slate-100 dark:bg-slate-600 px-4 py-2 rounded-xl text-slate-600 dark:text-slate-200 shadow-md shadow-slate-400/15"
        onClick={onOpen}
      >
        View Saved Shorts
      </button>
      <button
        className="border-none outline-none bg-slate-600 dark:bg-slate-100 font-bold rounded-lg px-4 py-2 text-slate-200 dark:text-slate-500 "
        onClick={() => {
          firebase_auth.signOut();
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignedInView;
