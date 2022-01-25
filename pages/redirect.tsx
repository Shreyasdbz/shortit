/** @format */

import { useEffect } from "react";

export default function redirect() {
  useEffect(() => {
    window.location.assign("https://www.google.com");
  });
  return <></>;
}
