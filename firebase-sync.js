// firebase-sync.js
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyB4FIqhBfY3mTPolBvcRP5Vzb-54zW_vcU",
    authDomain: "webforge-studio-611d7.firebaseapp.com",
    projectId: "webforge-studio-611d7",
    storageBucket: "webforge-studio-611d7.firebasestorage.app",
    messagingSenderId: "616575953826",
    appId: "1:616575953826:web:40a76bb16dd92f3ceb60fb",
    measurementId: "G-XRTNKR3EMD"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);

// Simulate sending page view / customer sync data
console.log(`[Firebase Sync] Page tracked: ${window.location.pathname}`);

export { app, analytics };
