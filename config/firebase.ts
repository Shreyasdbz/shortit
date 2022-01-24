/** @format */

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "@firebase/auth";
import { initializeFirestore, CACHE_SIZE_UNLIMITED } from "@firebase/firestore";
// import { getFunctions } from "@firebase/functions";

const firebaseApp = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});
// export const analytics = getAnalytics(firebaseApp);

export const firebase_google_provider = new GoogleAuthProvider();
export const firebase_gitHub_provider = new GithubAuthProvider();
export const firebase_auth = getAuth(firebaseApp);

export const firebase_firestore = initializeFirestore(firebaseApp, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});

// export const firebase_functions = getFunctions(firebaseApp);
