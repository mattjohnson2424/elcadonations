import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getFunctions } from "@firebase/functions"
import { getAuth, GoogleAuthProvider } from "@firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyB2nfbDJ-kMUCkHq0fuhVVYa9gA8SDXG7g",
  authDomain: "elcadonations.firebaseapp.com",
  projectId: "elcadonations",
  storageBucket: "elcadonations.appspot.com",
  messagingSenderId: "699005109702",
  appId: "1:699005109702:web:bae55c1162c0be913e9ec7",
  measurementId: "G-BSE5Z0YWEJ"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)
export const functions = getFunctions(app)

export const provider = new GoogleAuthProvider()