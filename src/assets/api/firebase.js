// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAi0sbW_ixn3d4F3hWaCEXyGcctsywQL-U",
    authDomain: "vue-blog-1769a.firebaseapp.com",
    projectId: "vue-blog-1769a",
    storageBucket: "vue-blog-1769a.appspot.com",
    messagingSenderId: "889113603597",
    appId: "1:889113603597:web:ba93a4c4ce43bca2b6ef44"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp