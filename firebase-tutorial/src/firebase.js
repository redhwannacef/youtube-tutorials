import firebase from 'firebase/app'

import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";

firebase.initializeApp({})

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();

export default firebase;
