/** @format */

import React, { useState, createContext } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "@firebase/firestore";

import {
  ApplyShortReturnType,
  GetRedirectResultType,
} from "../../interfaces/shorts";
import { firebase_firestore } from "../../config/firebase";
import { isValidUrl, generateShortString } from "../../lib/link";

type ShortsContextType = {
  short: string;
  setShort: React.Dispatch<React.SetStateAction<string>>;
  primaryUrl: string;
  setPrimaryUrl: React.Dispatch<React.SetStateAction<string>>;
  reGenerateShort: () => void;
  applyShort: () => Promise<ApplyShortReturnType>;
  getRedirect: (url: string) => Promise<GetRedirectResultType>;
};
export const ShortsContext = createContext({} as ShortsContextType);

type ShortsContextProviderProps = {
  children: React.ReactElement | React.ReactElement[];
};
export const ShortsContextProvider = ({
  children,
}: ShortsContextProviderProps) => {
  const [short, setShort] = useState<string>(generateShortString());
  const [primaryUrl, setPrimaryUrl] = useState<string>("");

  async function _set_short_in_db() {
    await setDoc(doc(firebase_firestore, "shorts", short), {
      fullUrl: primaryUrl,
      createdAt: serverTimestamp(),
    });
  }

  function reGenerateShort() {
    let newShort = generateShortString();
    setShort(newShort);
  }

  async function applyShort(): Promise<ApplyShortReturnType> {
    return new Promise<ApplyShortReturnType>((resolve, reject) => {
      // ERROR CHECK::::::::
      // Check if the url is valid
      if (!isValidUrl(primaryUrl)) {
        reject({
          result: "FAILURE",
          errorMessage: "Your URL is not valid :(",
        });
      }
      // ERROR CHECK::::::::
      // Check if short already exists
      _short_already_exists()
        .then((res) => {
          if (res === true) {
            reject({
              result: "FAILURE",
              errorMessage: "Short already exists :(",
            });
          } else {
            //   Now set the document
            _set_short_in_db()
              .then(() => {
                resolve({
                  result: "SUCCESS",
                });
              })
              .catch((setError) => {
                console.log("_set_short_in_db error: ", setError);
                reject({
                  result: "FAILURE",
                  errorMessage: "Looks like a database connection error :(",
                });
              });
          }
        })
        .catch((checkError) => {
          console.log("_short_already_exists check error: ", checkError);
          reject({
            result: "FAILURE",
            errorMessage: "Looks like a database connection error :(",
          });
        });
    });
  }

  async function getRedirect(url: string): Promise<GetRedirectResultType> {
    return new Promise<GetRedirectResultType>((resolve, reject) => {
      _retrieve_short(url).then((res) => {
        if (res.result === "SUCCESS") {
          resolve(res);
        } else {
          reject(res);
        }
      });
    });
  }

  async function _short_already_exists(newShort?: string): Promise<boolean> {
    let testShort = short;
    if (newShort) testShort = newShort;
    let docRef = await getDoc(doc(firebase_firestore, "shorts", testShort));
    if (docRef.exists()) {
      return true;
    } else {
      return false;
    }
  }

  async function _retrieve_short(
    short_to_retrieve_name: string
  ): Promise<GetRedirectResultType> {
    let docRef = await getDoc(
      doc(firebase_firestore, "shorts", short_to_retrieve_name)
    );
    if (docRef.exists()) {
      let targetUrl = docRef.data().fullUrl;
      return {
        result: "SUCCESS",
        link: targetUrl,
      };
    } else {
      return {
        result: "FAILURE",
        errorMessage: "Couldn't find the link",
      };
    }
  }

  return (
    <ShortsContext.Provider
      value={{
        short,
        setShort,
        primaryUrl,
        setPrimaryUrl,
        reGenerateShort,
        applyShort,
        getRedirect,
      }}
    >
      {children}
    </ShortsContext.Provider>
  );
};
