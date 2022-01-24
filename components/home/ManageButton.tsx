/** @format */

import { firebase_auth } from "../../config/firebase";

const ManageButton = () => {
  return (
    <div className="w-full flex items-center justify-center mt-5">
      <button
        className="border-none outline-none text-lg font-semibold bg-slate-100 dark:bg-slate-600 px-4 py-2 rounded-xl text-slate-400 dark:text-slate-200 shadow-md shadow-slate-400/25"
        onClick={() => {
          firebase_auth.signOut();
        }}
      >
        View Saved Shorts
      </button>
    </div>
  );
};

export default ManageButton;
