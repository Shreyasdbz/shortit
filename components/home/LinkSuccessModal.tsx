/** @format */

import { useContext, useEffect } from "react";

import { ShortsContext } from "../context/shortsContext";

import CaptionText from "../util/CaptionText";
import SecondaryButton from "../util/SecondaryButton";

type LinkSuccessModalProps = {
  onClose: () => void;
};

const LinkSuccessModal = ({ onClose }: LinkSuccessModalProps) => {
  const short = `https://shortit.app/${useContext(ShortsContext).short}`;

  useEffect(() => {
    navigator.clipboard.writeText(short);
  });

  return (
    <div
      className="w-full flex flex-col gap-2 items-center justify-center py-5"
      onClick={() => {}}
    >
      <span className="text-3xl font-semibold">Congruations!</span>
      <span className="text-xl font-semibold text-slate-600 dark:text-slate-400">
        Your new url is:
      </span>
      <div className="w-full px-5">
        <button
          className="w-full border-none outline-none px-2 py-2 bg-indigo-500 rounded-xl shadow-lg shadow-indigo-500/25 hover:opacity-90"
          onClick={() => {
            navigator.clipboard.writeText(short);
          }}
        >
          <span className="break-words text-slate-100 text-xl">{short}</span>
        </button>
        <CaptionText>Copied to clipboard :)</CaptionText>
      </div>
      <SecondaryButton onClick={onClose}>
        <span className="text-xl px-8 py-1 uppercase font-bold">Close</span>
      </SecondaryButton>
    </div>
  );
};

export default LinkSuccessModal;
