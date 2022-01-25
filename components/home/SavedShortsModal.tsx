/** @format */

import { useContext } from "react";

import { ShortsContext } from "../context/shortsContext";
import SecondaryButton from "../util/SecondaryButton";

type SavedShortsModalProps = {
  onClose: () => void;
};

const SavedShortsModal = ({ onClose }: SavedShortsModalProps) => {
  const savedShorts = useContext(ShortsContext).savedShorts;

  return (
    <div
      className="w-full flex flex-col gap-2 items-center justify-center py-5"
      onClick={() => {}}
    >
      <span className="text-3xl font-semibold">Your Saved Shorts</span>
      <span className="text-xl font-semibold text-slate-500 dark:text-slate-300">
        Tap to copy
      </span>
      <div className="w-full flex flex-col gap-4 items-center justify-center">
        {savedShorts.length > 0 ? (
          savedShorts.map((s) => {
            return (
              <div
                key={s.short}
                className="w-full flex flex-col items-center justify-center px-4"
              >
                <button
                  className="w-full flex flex-col items-center justify-start bg-slate-200 dark:bg-slate-800 rounded-lg shadow-lg shadow-slate-600/25 md:hover:-translate-y-0.5"
                  onClick={() => {
                    navigator.clipboard.writeText(`shortit.app/${s.short}`);
                  }}
                >
                  <span className=" w-full rounded-lg bg-indigo-500 px-4 py-4 text-xl font-semibold text-slate-100">
                    shortit.app/{s.short}
                  </span>
                  <span className="py-2 text-slate-600 dark:text-slate-400">
                    {s.fullUrl}
                  </span>
                </button>
              </div>
            );
          })
        ) : (
          <div>
            <span>You don't have any shorts saved :(</span>
          </div>
        )}
      </div>
      <div className="w-full flex items-center justify-center px-6">
        <SecondaryButton onClick={onClose}>
          <span className="text-xl py-2 uppercase font-bold">Close</span>
        </SecondaryButton>
      </div>
    </div>
  );
};

export default SavedShortsModal;
