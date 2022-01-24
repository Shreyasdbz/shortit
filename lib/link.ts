/** @format */

export function generateShortString(shortLength: number): string {
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
