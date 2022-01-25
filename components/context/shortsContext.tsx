/** @format */

import React, { useState, createContext } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "@firebase/firestore";

import {
  ApplyShortReturnType,
  GetRedirectResultType,
  SavedShortType,
} from "../../interfaces/shorts";
import { firebase_firestore, firebase_auth } from "../../config/firebase";
import { isValidUrlFull, generateShortString } from "../../lib/link";

type ShortsContextType = {
  short: string;
  setShort: React.Dispatch<React.SetStateAction<string>>;
  primaryUrl: string;
  setPrimaryUrl: React.Dispatch<React.SetStateAction<string>>;
  savedShorts: SavedShortType[];
  reGenerateShort: () => void;
  applyShort: () => Promise<ApplyShortReturnType>;
  getRedirect: (url: string) => Promise<GetRedirectResultType>;
  getSavedShorts: () => void;
  initiateUserDoc: () => void;
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
  const [savedShorts, setSavedShorts] = useState<SavedShortType[]>([]);

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

  async function _set_short_in_db() {
    // Set in main collection
    await setDoc(doc(firebase_firestore, "shorts", short), {
      fullUrl: primaryUrl,
      createdAt: serverTimestamp(),
    });
    // Set in user collection if user is signed in
    if (firebase_auth.currentUser) {
      const docSnap = await getDoc(
        doc(firebase_firestore, "users", firebase_auth.currentUser.uid)
      );
      if (docSnap.exists()) {
        let currentShortsList: string[] = docSnap.data().createdShorts;
        currentShortsList.push(short);
        await setDoc(
          doc(firebase_firestore, "users", firebase_auth.currentUser.uid),
          {
            createdShorts: currentShortsList,
          }
        ).catch((setError) => {
          console.log(
            "_set_short_in_db [User] Couldn't set data for current user"
          );
        });
      } else {
        console.log(
          "_set_short_in_db [User] Couldn't retrieve data for current user"
        );
      }
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

  async function _retrieve_all_shorts(userShorts: string[]) {
    let expandedShortsList: SavedShortType[] = [];
    for (let s of userShorts) {
      let docRef = await getDoc(doc(firebase_firestore, "shorts", s));
      if (docRef.exists()) {
        let expandedShort: SavedShortType = {
          short: s,
          fullUrl: docRef.data().fullUrl,
        };
        expandedShortsList.push(expandedShort);
      }
    }
    setSavedShorts(expandedShortsList);
  }

  async function initiateUserDoc() {
    //
    if (firebase_auth.currentUser) {
      let docSnap = await getDoc(
        doc(firebase_firestore, "users", firebase_auth.currentUser.uid)
      );
      if (docSnap.exists()) {
        // No action
      } else {
        await setDoc(
          doc(firebase_firestore, "users", firebase_auth.currentUser.uid),
          {
            createdShorts: [],
          }
        );
      }
    }
  }

  function reGenerateShort() {
    let newShort = generateShortString();
    setShort(newShort);
  }

  async function applyShort(): Promise<ApplyShortReturnType> {
    return new Promise<ApplyShortReturnType>((resolve, reject) => {
      // ERROR CHECK::::::::
      // Check if short is valid ([a-z]&[0-9])
      setShort(short.toLowerCase());
      // /^[a-z0-9]+$/i
      if (!short.match(/^[a-z0-9]+$/i)) {
        reject({
          result: "FAILURE",
          errorMessage: "Your SHORT is not valid :(",
        });
      }
      // ERROR CHECK::::::::
      // Check if the url is valid
      if (!isValidUrlFull(primaryUrl)) {
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

  async function getSavedShorts() {
    if (firebase_auth.currentUser) {
      const docSnap = await getDoc(
        doc(firebase_firestore, "users", firebase_auth.currentUser.uid)
      );
      if (docSnap.exists()) {
        let userShorts: string[] = docSnap.data().createdShorts;
        _retrieve_all_shorts(userShorts);
      } else {
        console.log("Could find any saved shorts");
      }
    } else {
      console.log("No user sign in");
    }
  }

  return (
    <ShortsContext.Provider
      value={{
        short,
        setShort,
        primaryUrl,
        setPrimaryUrl,
        savedShorts,
        reGenerateShort,
        applyShort,
        getRedirect,
        getSavedShorts,
        initiateUserDoc,
      }}
    >
      {children}
    </ShortsContext.Provider>
  );
};
