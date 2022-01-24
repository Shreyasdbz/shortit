/** @format */

import { collection, doc, getDoc, setDoc } from "@firebase/firestore";

import { firebase_firestore } from "../config/firebase";

function _generate_short(shortLength: number): string {
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
  let short = "";
  for (let i = 0; i < shortLength; i++) {
    let randomChar =
      charOptions[Math.floor(Math.random() * charOptions.length)];
    short += randomChar;
  }
  return short;
}

export const generateShort = async () => {
  // Generate -------
  let shortLength = 6;
  let short = _generate_short(shortLength);
  // Check if exists
  let exists = true;
  while (exists) {
    const docRef = doc(firebase_firestore, "shorts", short);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      short = _generate_short(shortLength);
    } else {
      exists = false;
    }
  }

  return short;
};

export const shortExists = (): boolean => {
  let exists = false;

  return exists;
};
