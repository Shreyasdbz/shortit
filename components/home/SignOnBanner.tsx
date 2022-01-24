/** @format */

import { BsGoogle } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { BsApple } from "react-icons/bs";

import SignOnButton from "../util/SignOnButton";

const SignOnBanner = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2">
      <span className="text-slate-600 dark:text-slate-400">
        Sign in to save shorts
      </span>
      <hr className="w-9/12 border-1 border-slate-400 dark:border-slate-600  rounded-full " />
      <div className="w-full flex items-center justify-center gap-4">
        <SignOnButton>
          <BsGoogle className="text-xl text-slate-600 dark:text-slate-200" />
        </SignOnButton>
        <SignOnButton>
          <BsGithub className="text-xl text-slate-600 dark:text-slate-200" />
        </SignOnButton>
        <SignOnButton>
          <BsApple className="text-xl text-slate-600 dark:text-slate-200" />
        </SignOnButton>
      </div>
    </div>
  );
};
export default SignOnBanner;
