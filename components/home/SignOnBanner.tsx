/** @format */
import { useContext } from "react";
import { BsGoogle } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
// import { BsApple } from "react-icons/bs";
// import { BsMicrosoft } from "react-icons/bs";
import { signInWithPopup } from "@firebase/auth";

import {
  firebase_auth,
  firebase_google_provider,
  firebase_gitHub_provider,
} from "../../config/firebase";
import { ShortsContext } from "../context/shortsContext";

import SignOnButton from "../util/SignOnButton";

const SignOnBanner = () => {
  const initiateUser = useContext(ShortsContext).initiateUserDoc;

  function signInWithGoogle() {
    signInWithPopup(firebase_auth, firebase_google_provider)
      .then(() => {
        initiateUser();
      })
      .catch((err) => {
        console.log("Google Provider sign in error: ", err);
        alert("Sorry looks like we couldn't sign you in with Google");
      });
  }
  function signInWithGitHub() {
    signInWithPopup(firebase_auth, firebase_gitHub_provider)
      .then(() => {
        initiateUser();
      })
      .catch((err) => {
        console.log("GitHub Provider sign in error: ", err);
        alert("Sorry looks like we couldn't sign you in with GitHub");
      });
  }
  // function signInWithApple() {
  //   signInWithPopup(firebase_auth, firebase_google_provider).then(() => {
  //     //
  //   });
  // }
  // function signInWithMicrosoft() {
  //   signInWithPopup(firebase_auth, firebase_google_provider).then(() => {
  //     //
  //   });
  // }

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2 mb-10">
      <span className="text-slate-600 dark:text-slate-400">
        Sign in to save shorts
      </span>
      <hr className="w-9/12 border-1 border-slate-400 dark:border-slate-600  rounded-full " />
      <div className="w-full flex items-center justify-center gap-4">
        <SignOnButton signInFunction={signInWithGoogle}>
          <BsGoogle className="text-xl text-slate-600 dark:text-slate-200" />
        </SignOnButton>
        <SignOnButton signInFunction={signInWithGitHub}>
          <BsGithub className="text-xl text-slate-600 dark:text-slate-200" />
        </SignOnButton>
        {/* <SignOnButton signInFunction={signInWithApple}>
          <BsApple className="text-xl text-slate-600 dark:text-slate-200" />
        </SignOnButton> */}
        {/* <SignOnButton signInFunction={signInWithMicrosoft}>
          <BsMicrosoft className="text-xl text-slate-600 dark:text-slate-200" />
        </SignOnButton> */}
      </div>
    </div>
  );
};
export default SignOnBanner;
