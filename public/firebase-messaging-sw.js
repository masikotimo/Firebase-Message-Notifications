/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

// import * as firebase from 'firebase/app';

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');


const firebaseConfig = {
    apiKey: "AIzaSyDh3IpeBnyAC8gI-NnuCr2Ro6W6WdX8Cy0",
    authDomain: "cba-admin.firebaseapp.com",
    projectId: "cba-admin",
    storageBucket: "cba-admin.appspot.com",
    messagingSenderId: "647871704189",
    appId: "1:647871704189:web:0c87aba05b187ceb7a1514",
    measurementId: "G-4NN64SERND"
  };
  
  firebase.initializeApp(firebaseConfig);


const messaging =  firebase.messaging();



messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png",
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
