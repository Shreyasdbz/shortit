/** @format */

export function generateShortString(shortLength?: number): string {
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
  if (!shortLength) shortLength = 4;
  let short = "";
  for (let i = 0; i < shortLength; i++) {
    let randomChar =
      charOptions[Math.floor(Math.random() * charOptions.length)];
    short += randomChar;
  }
  return short;
}

export function isValidUrl(urlInput: string): boolean {
  var res = urlInput.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
}

export function isValidUrlFull(urlInput: string): boolean {
  let url;

  try {
    url = new URL(urlInput);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}
