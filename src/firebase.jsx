// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGcOPT-3hmgMbnLL0UxQrFkfyk-aoM3uk",
  authDomain: "podcast-app-b58e2.firebaseapp.com",
  projectId: "podcast-app-b58e2",
  storageBucket: "podcast-app-b58e2.appspot.com",
  messagingSenderId: "230271042509",
  appId: "1:230271042509:web:de7fb967a50dcdef943a84",
  measurementId: "G-ZD6DE00VXL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth  = getAuth(app);
