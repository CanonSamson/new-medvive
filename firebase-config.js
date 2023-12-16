import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCD4v3bfixc86fvZ8twqJnIDLy3iGzmUnk",
  authDomain: "medvive-43702.firebaseapp.com",
  databaseURL: "https://medvive-43702-default-rtdb.firebaseio.com",
  projectId: "medvive-43702",
  storageBucket: "medvive-43702.appspot.com",
  messagingSenderId: "217353310863",
  appId: "1:217353310863:web:1f533f25800f94a61756fa",
  measurementId: "G-GFF4ZDKZN0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
const auth = getAuth(app);

export { auth };
