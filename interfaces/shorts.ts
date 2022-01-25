/** @format */

type ApplyShortSuccessType = {
  result: "SUCCESS";
};
type ApplyShortFailureType = {
  result: "FAILURE";
  errorMessage: string;
};

export type ApplyShortReturnType =
  | ApplyShortSuccessType
  | ApplyShortFailureType;

type GetRedirectSuccessType = {
  result: "SUCCESS";
  link: string;
};

type GetRedirectFailureType = {
  result: "FAILURE";
  errorMessage: string;
};

export type GetRedirectResultType =
  | GetRedirectSuccessType
  | GetRedirectFailureType;

export type SavedShortType = {
  short: string;
  fullUrl: string;
};

type SavedShortsRetrieveSuccessType = {
  result: "SUCCESS";
  shortsList: string[];
};
type SavedShortsRetrieveFailureType = {
  result: "FAILURE";
};
export type SavedShortsRetrieveType =
  | SavedShortsRetrieveSuccessType
  | SavedShortsRetrieveFailureType;

type SavedShortSuccessResultType = {
  result: "SUCCESS";
  data: SavedShortType[];
};
type SavedShortFailureResultType = {
  result: "FAILURE";
  errorMessage: string;
};

export type SavedShortResultType =
  | SavedShortSuccessResultType
  | SavedShortFailureResultType;
