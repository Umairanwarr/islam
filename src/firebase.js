// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj4Hr1hcMJ9d8tk050vk5fpn6tXi8zoqs",
  authDomain: "islam-cc159.firebaseapp.com",
  projectId: "islam-cc159",
  storageBucket: "islam-cc159.appspot.com",
  messagingSenderId: "127252813052",
  appId: "1:127252813052:web:18e704e65e0fbfe1d33379"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };