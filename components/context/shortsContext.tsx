/** @format */

import React, { useState, createContext } from "react";
import { doc, getDoc, setDoc, collection } from "@firebase/firestore";
import { ApplyShortReturnType } from "../../interfaces/shorts";
import { firebase_firestore } from "../../config/firebase";

type ShortsContextType = {
  short: string;
  setShort: React.Dispatch<React.SetStateAction<string>>;
  primaryUrl: string;
  setPrimaryUrl: React.Dispatch<React.SetStateAction<string>>;
  reGenerateShort: () => void;
  applyShort_legacy: () => ApplyShortReturnType;
  applyShortAsyncTest: () => Promise<ApplyShortReturnType>;
  applyShort: () => void;
};
export const ShortsContext = createContext({} as ShortsContextType);

type ShortsContextProviderProps = {
  children: React.ReactElement | React.ReactElement[];
};
export const ShortsContextProvider = ({
  children,
}: ShortsContextProviderProps) => {
  const [short, setShort] = useState<string>(_generate_short_string());
  const [primaryUrl, setPrimaryUrl] = useState<string>("");

  function _generate_short_string(shortLength?: number): string {
    let charOptions = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];
    if (!shortLength) {
      shortLength = 6;
    }
    let newShort = "";
    for (let i = 0; i < shortLength; i++) {
      let randomChar =
        charOptions[Math.floor(Math.random() * charOptions.length)];
      newShort += randomChar;
    }
    return newShort;
  }

  function reGenerateShort() {
    setShort(_generate_short_string());
  }

  function applyShort_legacy(): ApplyShortReturnType {
    let res: ApplyShortReturnType = {
      result: "SUCCESS",
    };
    //   Check if short already exists
    //   Set Short
    return res;
  }

  async function applyShortAsyncTest() {
    return new Promise<ApplyShortReturnType>((resolve, reject) => {
      resolve({
        result: "SUCCESS",
      });
      reject({
        result: "FAILURE",
        error: "Unknown",
      });
    });
  }

  function applyShort() {
    //
    _short_already_exists().then((res) => {
      console.log(res);
    });
  }

  async function _short_already_exists() {
    // const docRef = doc(firebase_firestore, "shorts", short);
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //   return true;
    // } else {
    //   return false;
    // }

    const shortsRef = collection(firebase_firestore, "shorts");

    await getDoc(doc(shortsRef, short)).then((d) => {
      console.log(d);
    });
  }

  const _set_short = async () => {
    //
  };

  return (
    <ShortsContext.Provider
      value={{
        short,
        setShort,
        primaryUrl,
        setPrimaryUrl,
        reGenerateShort,
        applyShort_legacy,
        applyShortAsyncTest,
        applyShort,
      }}
    >
      {children}
    </ShortsContext.Provider>
  );
};
