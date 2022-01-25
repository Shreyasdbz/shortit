/** @format */

import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Head from "next/head";

import { ShortsContext } from "../components/context/shortsContext";

import HeaderLarge from "../components/util/HeaderLarge";
import PageContainer from "../components/util/PageContainer";
import SubHeading from "../components/util/SubHeading";

export default function Custom404() {
  const { asPath } = useRouter();
  const getRedirect = useContext(ShortsContext).getRedirect;

  // useEffect(() => {
  //   getRedirect(asPath).then((res) => {
  //     if (res.result === "SUCCESS") {
  //       console.log("Link: ", res.link);
  //       window.location.assign(res.link);
  //     } else if (res.result === "FAILURE") {
  //       //
  //     }
  //   });
  // }, []);

  getRedirect(asPath).then((res) => {
    if (res.result === "SUCCESS") {
      console.log("Link: ", res.link);
      console.log("Href: ", window.location.href);
      window.location.href = res.link;
    } else if (res.result === "FAILURE") {
      //
    }
  });

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center ">
      <Head>
        <title>Short It Redirect</title>
      </Head>
      <PageContainer>
        <main className="w-full py-5 px-4 flex flex-col items-center justify-start dark:text-white">
          <HeaderLarge />
          <SubHeading location="center">Shorten URLs in 3 taps!</SubHeading>
          <div className="w-full flex items-center justify-center px-4 py-10">
            <h1 className="bg-slate-100 dark:bg-slate-700 px-4 py-4 text-xl rounded-xl">
              <span>Unfortunately </span>
              {/* <span className="bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-md">{`shortit.app${asPath}`}</span> */}
              <span className="text-indigo-500 rounded-md">{`shortit.app${asPath}`}</span>
              <span> doesn't exist :(</span>
            </h1>
          </div>

          <div className="w-full flex items-center justify-center">
            <button
              className="flex flex-row items-center h-full justify-center px-4 py-4 rounded-lg bg-indigo-500 shadow-lg shadow-slate-600/25 text-slate-100 font-bold hover:opacity-90 md:hover:-translate-y-0.5 text-xl"
              onClick={() => {
                window.location.assign("https://www.shortit.app");
              }}
            >
              But you can create one here!
            </button>
          </div>
        </main>
      </PageContainer>
    </div>
  );
}
