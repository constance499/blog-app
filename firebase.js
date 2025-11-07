// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOlOzlbFCjvo-k6MvGQzXuvSAMWFBPTmo",
  authDomain: "blog-app-19d9b.firebaseapp.com",
  projectId: "blog-app-19d9b",
  storageBucket: "blog-app-19d9b.firebasestorage.app",
  messagingSenderId: "246268136265",
  appId: "1:246268136265:web:aaeb985e1081995acda898",
  measurementId: "G-46J4TLLNS9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);