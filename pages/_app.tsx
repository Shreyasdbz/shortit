/** @format */

import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ShortsContextProvider } from "../components/context/shortsContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ShortsContextProvider>
      <Component {...pageProps} />
    </ShortsContextProvider>
  );
}

export default MyApp;
