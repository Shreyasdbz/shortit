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
