// import * as firebase from 'firebase/app';
import   'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { getMessaging } from "firebase/messaging/sw";

const firebaseConfig = {
  apiKey: "AIzaSyDh3IpeBnyAC8gI-NnuCr2Ro6W6WdX8Cy0",
  authDomain: "cba-admin.firebaseapp.com",
  projectId: "cba-admin",
  storageBucket: "cba-admin.appspot.com",
  messagingSenderId: "647871704189",
  appId: "1:647871704189:web:0c87aba05b187ceb7a1514",
  measurementId: "G-4NN64SERND"
};

const firebase = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseConfig);

// const { REACT_APP_VAPID_KEY } = process.env
// const publicKey = REACT_APP_VAPID_KEY;

const publicKey = 'BMjqzvXjNgfgWAgwfTWn14sDSXjvIHxL0V39iquGX1n6GbU_cnrlOKmAihKN1nv8dXNXfv0AJAU7TbVwA3d9fsE';

export const getToken = async (setTokenFound) => {
  let currentToken = '';
  try {
    currentToken = await messaging.getToken({vapidKey: publicKey});
    if (currentToken) {
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log('An error occurred while retrieving token.', error);
  }
  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });


