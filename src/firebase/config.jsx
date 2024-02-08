// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAclzTEZhCjq0yVSbVYx6VKNGDR2QpzqGM",
  authDomain: "agenda-web-esther.firebaseapp.com",
  projectId: "agenda-web-esther",
  storageBucket: "agenda-web-esther.appspot.com",
  messagingSenderId: "21197876535",
  appId: "1:21197876535:web:7e156dcd3fb16e686e3eb2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)