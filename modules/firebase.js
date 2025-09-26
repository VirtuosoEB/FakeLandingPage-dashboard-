
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyAcgow0Bmmvdi0ENazyuMcBkKccbCy40Lk",
    authDomain: "fake-landing-page-7aac4.firebaseapp.com",
    projectId: "fake-landing-page-7aac4",
    storageBucket: "fake-landing-page-7aac4.firebasestorage.app",
    messagingSenderId: "801055950197",
    appId: "1:801055950197:web:71675dc4816d1b4fb07f3c",
    measurementId: "G-GS05BYCB9K"
  };


  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);

