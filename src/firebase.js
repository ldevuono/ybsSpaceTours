// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCR9srlcdM7dscOi84gus0lpPM93Dl_qkw",

  authDomain: "ybs-jarl.firebaseapp.com",

  projectId: "ybs-jarl",

  storageBucket: "ybs-jarl.appspot.com",

  messagingSenderId: "19697217854",

  appId: "1:19697217854:web:68f9b00b23e3a4bbc67c6f",

  measurementId: "G-5T247X8EW9"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export default app;