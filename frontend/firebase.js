// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAuEtRtgQeAjhp-jEEnXAFPxbrRRYQpl-E",
    authDomain: "vroomcar-c2339.firebaseapp.com",
    projectId: "vroomcar-c2339",
    storageBucket: "vroomcar-c2339.firebasestorage.app",
    messagingSenderId: "544194483557",
    appId: "1:544194483557:web:c0d67e960d65c2f5a6bd8c",
    measurementId: "G-E6YGY5ZK3D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();