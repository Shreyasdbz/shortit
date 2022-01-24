/** @format */

import { useState } from "react";
import Head from "next/head";
import { RefreshIcon } from "@heroicons/react/solid";

import { LinkSuccessTypes } from "../interfaces/homeView";

import { generateShort, shortExists } from "../lib/link";

import PageContainer from "../components/util/PageContainer";
import InfoTab from "../components/util/InfoTab";
import HeaderLarge from "../components/home/HeaderLarge";
import CaptionText from "../components/util/CaptionText";
import InputBox from "../components/util/InputBox";
import SubHeading from "../components/util/SubHeading";
import InputContainer from "../components/util/InputContainer";
import SecondaryButton from "../components/util/SecondaryButton";
import Modal from "../components/util/Modal";
import LinkSuccessModal from "../components/home/LinkSuccessModal";

export default function Home() {
  // Data
  const [customShort, setCustomShort] = useState(generateShort());
  // Modals
  const [linkSuccessModalActive, setLinkSuccessModalActive] =
    useState<boolean>(false);

  function handleGenerate() {
    setCustomShort(generateShort());
  }

  function handleLinkSuccess(payload: LinkSuccessTypes) {
    let errorMessage = "";
    if (shortExists()) {
      errorMessage = "This short already exists :(";
    }
    if (errorMessage === "") {
      if (payload.action === "OPEN") {
        setLinkSuccessModalActive(true);
      } else if (payload.action === "CLOSE") {
        setLinkSuccessModalActive(false);
      }
    } else {
      alert(errorMessage);
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
          link={"customShort"}
          onClose={() => {
            handleLinkSuccess({ action: "CLOSE" });
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
            <InputBox />
          </InputContainer>
          {/* Custom URL Input */}
          <InputContainer>
            <CaptionText>Auto / Custom Short</CaptionText>
            <div className="w-full flex flex-row justify-start items-center gap-4">
              <InputBox />
              <button
                className="flex flex-row items-center h-full justify-center px-2 rounded-lg bg-indigo-500 shadow-lg shadow-indigo-500/25 text-slate-100 font-bold "
                onClick={handleGenerate}
              >
                <RefreshIcon className="w-8 h-8 shadow-md text-slate-100 hover:animate-spin outline-none border-none rounded-full" />
                Generate
              </button>
            </div>
          </InputContainer>
          {/* <span className="text-red-500">Name is already taken :(</span> */}
          <SecondaryButton
            onClick={() => {
              handleLinkSuccess({ action: "OPEN" });
            }}
          >
            <span className="text-xl px-8 py-1 uppercase font-bold">Apply</span>
          </SecondaryButton>
        </main>
        <InfoTab />
      </PageContainer>
    </div>
  );
}
