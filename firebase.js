// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkHEt-_GI0eUje4XbFZLK_MBIAyk53d6E",
  authDomain: "golfapp-8a4a9.firebaseapp.com",
  projectId: "golfapp-8a4a9",
  storageBucket: "golfapp-8a4a9.appspot.com",
  messagingSenderId: "1021420778799",
  appId: "1:1021420778799:web:c82f87f80de80040a29dda",
  measurementId: "G-N29FLH8VNT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;