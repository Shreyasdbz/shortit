/** @format */

import { useState, useContext } from "react";
import Head from "next/head";
import { RefreshIcon } from "@heroicons/react/solid";
import { useAuthState } from "react-firebase-hooks/auth";

import { firebase_auth } from "../config/firebase";
import {
  ApplyTypes,
  SavedShortsModalTypes,
  InfoModalTypes,
} from "../interfaces/homeView";
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
import SignedInView from "../components/home/SignedInView";
import SignOnBanner from "../components/home/SignOnBanner";
import SavedShortsModal from "../components/home/SavedShortsModal";
import InfoModal from "../components/util/InfoModal";

export default function Home() {
  // Context
  const generateShort = useContext(ShortsContext).reGenerateShort;
  const short = useContext(ShortsContext).short;
  const setShort = useContext(ShortsContext).setShort;
  const primaryUrl = useContext(ShortsContext).primaryUrl;
  const setPrimaryUrl = useContext(ShortsContext).setPrimaryUrl;
  const applyShort = useContext(ShortsContext).applyShort;
  const getSavedShorts = useContext(ShortsContext).getSavedShorts;

  // Data
  const [userSignedIn] = useAuthState(firebase_auth);
  // Modals
  const [linkSuccessModalActive, setLinkSuccessModalActive] =
    useState<boolean>(false);
  const [savedShortsModalActive, setSavedShortsModalActive] = useState(false);
  const [infoModalActive, setInfoModalActive] = useState(false);

  function handleApply(payload: ApplyTypes) {
    if (payload.action === "OPEN") {
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

  function handleSavedShorts(payload: SavedShortsModalTypes) {
    if (payload.action === "OPEN") {
      getSavedShorts();
      setSavedShortsModalActive(true);
    } else if (payload.action === "CLOSE") {
      setSavedShortsModalActive(false);
    }
  }

  function handleInfoModal(payload: InfoModalTypes) {
    if (payload.action === "OPEN") {
      setInfoModalActive(true);
    } else if (payload.action === "CLOSE") {
      setInfoModalActive(false);
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center ">
      <Head>
        <title>Short It</title>
      </Head>
      {/* Blur */}
      {(linkSuccessModalActive ||
        savedShortsModalActive ||
        infoModalActive) && (
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
      {/* Shorts History / Saved Shorts Modal */}
      <Modal activeOn={savedShortsModalActive}>
        <SavedShortsModal
          onClose={() => {
            handleSavedShorts({ action: "CLOSE" });
          }}
        />
      </Modal>
      {/* Info Modal Modal */}
      <Modal activeOn={infoModalActive}>
        <InfoModal
          onClose={() => {
            handleInfoModal({ action: "CLOSE" });
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
          <div className="w-full max-w-3xl flex items-center justify-center">
            <SecondaryButton
              onClick={() => {
                handleApply({ action: "OPEN" });
              }}
            >
              <span className="text-xl py-2 uppercase font-bold">Apply</span>
            </SecondaryButton>
          </div>
          {userSignedIn ? (
            <SignedInView
              onOpen={() => handleSavedShorts({ action: "OPEN" })}
            />
          ) : (
            <SignOnBanner />
          )}
        </main>
        <InfoTab
          onOpen={() => {
            handleInfoModal({ action: "OPEN" });
          }}
        />
      </PageContainer>
    </div>
  );
}
