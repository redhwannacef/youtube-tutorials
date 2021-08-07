import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";

firebase.initializeApp({});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();

if (window.location.hostname.includes("localhost")) {
  auth.useEmulator("http://localhost:9099");
  firestore.useEmulator("localhost", 8080);
  functions.useEmulator("localhost", 5001);
}

export default firebase;
