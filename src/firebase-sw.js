import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
    apiKey: "AIzaSyDh3IpeBnyAC8gI-NnuCr2Ro6W6WdX8Cy0",
    authDomain: "cba-admin.firebaseapp.com",
    projectId: "cba-admin",
    storageBucket: "cba-admin.appspot.com",
    messagingSenderId: "647871704189",
    appId: "1:647871704189:web:0c87aba05b187ceb7a1514",
    measurementId: "G-4NN64SERND"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);

