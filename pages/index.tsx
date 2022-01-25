/** @format */

import { useState, useContext } from "react";
import Head from "next/head";
import { RefreshIcon } from "@heroicons/react/solid";
import { useAuthState } from "react-firebase-hooks/auth";

import { firebase_auth } from "../config/firebase";
import { LinkSuccessTypes } from "../interfaces/homeView";
import { ShortsContext } from "../components/context/shortsContext";

import PageContainer from "../components/util/PageContainer";
import InfoTab from "../components/util/InfoTab";
import HeaderLarge from "../components/util/HeaderLarge";
import CaptionText from "../components/util/CaptionText";
import InputBox from "../components/util/InputBox";
import SubHeading from "../components/util/SubHeading";
import InputContainer from "../components/util/InputContainer";
import SecondaryButton from "../components/util/SecondaryButton";
import Modal from "../components/util/Modal";
import LinkSuccessModal from "../components/home/LinkSuccessModal";
// import SignOnBanner from "../components/home/SignOnBanner";
// import ManageButton from "../components/home/ManageButton";

export default function Home() {
  // Context
  const generateShort = useContext(ShortsContext).reGenerateShort;
  const short = useContext(ShortsContext).short;
  const setShort = useContext(ShortsContext).setShort;
  const primaryUrl = useContext(ShortsContext).primaryUrl;
  const setPrimaryUrl = useContext(ShortsContext).setPrimaryUrl;
  const applyShort = useContext(ShortsContext).applyShort;
  // Data
  const [userSignedIn] = useAuthState(firebase_auth);
  // Modals
  const [linkSuccessModalActive, setLinkSuccessModalActive] =
    useState<boolean>(false);

  function handleApply(payload: LinkSuccessTypes) {
    if (payload.action === "OPEN") {
      // let verification = applyShort();
      // if (verification.result === "SUCCESS") {
      //   setLinkSuccessModalActive(true);
      // } else if (verification.result === "FAILURE") {
      //   let err = verification.errorMessage;
      //   alert(err);
      // }
      // applyShortAsync().then((data) => [console.log(data)]);
      applyShort()
        .then((data) => {
          console.log("In component: [data]", data);
          setLinkSuccessModalActive(true);
        })
        .catch((err) => {
          console.log("In component: [error]", err);
          alert(err.errorMessage);
        });
    } else if (payload.action === "CLOSE") {
      setLinkSuccessModalActive(false);
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center ">
      <Head>
        <title>Short It</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Blur */}
      {linkSuccessModalActive && (
        <div
          className="w-screen h-screen fixed top-0 left-0"
          style={{
            backdropFilter: `blur(8px)`,
          }}
        />
      )}
      {/* Link Success Modal */}
      <Modal activeOn={linkSuccessModalActive}>
        <LinkSuccessModal
          onClose={() => {
            handleApply({ action: "CLOSE" });
          }}
        />
      </Modal>
      <PageContainer>
        <main className="w-full py-5 px-4 flex flex-col items-center justify-start dark:text-white">
          <HeaderLarge />
          <SubHeading location="center">Shorten URLs in 3 taps!</SubHeading>
          {/* Primary URL Input */}
          <InputContainer>
            <CaptionText>Your Url</CaptionText>
            <InputBox value={primaryUrl} onChange={setPrimaryUrl} />
          </InputContainer>
          {/* Custom URL Input */}
          <InputContainer>
            <CaptionText>Auto / Custom Short</CaptionText>
            <div className="w-full flex flex-row justify-start items-center gap-4">
              <InputBox value={short} onChange={setShort} />
              <button
                className="flex flex-row items-center h-full justify-center px-2 rounded-lg bg-indigo-500 shadow-lg shadow-slate-600/25 text-slate-100 font-bold hover:opacity-90 md:hover:-translate-y-0.5"
                onClick={generateShort}
              >
                <RefreshIcon className="w-8 h-8 shadow-md text-slate-100 md:hover:animate-spin outline-none border-none rounded-full" />
                Generate
              </button>
            </div>
          </InputContainer>
          {/* <span className="text-red-500">Name is already taken :(</span> */}
          <SecondaryButton
            onClick={() => {
              handleApply({ action: "OPEN" });
            }}
          >
            <span className="text-xl px-8 py-1 uppercase font-bold">Apply</span>
          </SecondaryButton>
          {/* {userSignedIn ? <ManageButton /> : <SignOnBanner />} */}
        </main>
        <InfoTab />
      </PageContainer>
    </div>
  );
}
