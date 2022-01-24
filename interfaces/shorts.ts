/** @format */

type ApplyShortSuccess = {
  result: "SUCCESS";
};
type ApplyShortFailure = {
  result: "FAILURE";
  errorMessage: string;
};

export type ApplyShortReturnType = ApplyShortSuccess | ApplyShortFailure;
