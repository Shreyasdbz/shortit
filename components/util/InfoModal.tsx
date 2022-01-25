/** @format */
import { BsGithub } from "react-icons/bs";

import CaptionText from "./CaptionText";
import SecondaryButton from "./SecondaryButton";
import SubHeading from "./SubHeading";

type InfoModalProps = {
  onClose: () => void;
};

const InfoModal = ({ onClose }: InfoModalProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 px-4">
      <SubHeading location="center">Infomation</SubHeading>
      <CaptionText>Summary</CaptionText>
      <span className="font-semibold text-lg">
        ShortIt.app is a neat and tidy way of quickly generating short &
        shareable links for long URLs.
      </span>
      <CaptionText>Privacy</CaptionText>
      <span className="font-light text-md">
        User data from Login is not sold or sent to any other parties or
        applications niether is it used in any manner other than the scope of
        this application.
      </span>
      <CaptionText>GitHub Link</CaptionText>
      <a
        href="https://github.com/shreyasdbz/shortit"
        target="_blank"
        rel="noreferrer"
        className=""
      >
        <button className="w-full h-full flex items-center justify-center gap-2  bg-slate-200 rounded-xl dark:bg-slate-800 shadow-md px-4 py-2 md:hover:-translate-y-0.5">
          <BsGithub className="text-xl text-slate-600 dark:text-slate-200" />
          <span className="text-xl text-slate-600 dark:text-slate-200">
            GitHub
          </span>
        </button>
      </a>

      <SecondaryButton onClick={onClose}>
        <span className="text-xl py-2 uppercase font-bold">Close</span>
      </SecondaryButton>
    </div>
  );
};

export default InfoModal;
