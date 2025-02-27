// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDj6dOpBZGq_JK0VYYDKmeV8CrzFN9wHN8",
  authDomain: "my-chat-app-7a584.firebaseapp.com",
  projectId: "my-chat-app-7a584",
  storageBucket: "my-chat-app-7a584.appspot.com",
  messagingSenderId: "971479623151",
  appId: "1:971479623151:web:b2673c7b4b28aa0d1dc21a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
