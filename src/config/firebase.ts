// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKUMUz1dGUthilXY9iY1IptYmGf6kLi6g",
  authDomain: "react-course-49cf3.firebaseapp.com",
  projectId: "react-course-49cf3",
  storageBucket: "react-course-49cf3.appspot.com",
  messagingSenderId: "655240927880",
  appId: "1:655240927880:web:e71ecb9e18642838b1dd3d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);