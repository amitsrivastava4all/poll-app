







//************************ */
  // Import the functions you need from the SDKs you need
  import {getFirestore} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js'
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC_mI9suJnHiM3i2m2I7cRKgbr9QzjlB4w",
    authDomain: "pollingappdb.firebaseapp.com",
    projectId: "pollingappdb",
    storageBucket: "pollingappdb.appspot.com",
    messagingSenderId: "1058654335185",
    appId: "1:1058654335185:web:59925349f8dacdb769d5f0",
    measurementId: "G-7H43G93J03"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  console.log('FireBase App is ', app);
  export const db = getFirestore(app);
  const analytics = getAnalytics(app);
