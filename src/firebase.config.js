// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCccKYoxjCncDWkqhOtTDkMT-0J5OJNfLI",
  authDomain: "online-house-marketplace-app.firebaseapp.com",
  projectId: "online-house-marketplace-app",
  storageBucket: "online-house-marketplace-app.appspot.com",
  messagingSenderId: "595827672653",
  appId: "1:595827672653:web:9f9a11819b5878a4487e04",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
