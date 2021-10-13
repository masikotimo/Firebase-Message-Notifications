import firebase from "firebase/app";
import 'firebase/messaging';


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
const messaging = firebase.messaging()

// const { REACT_APP_VAPID_KEY } = process.env
// const publicKey = REACT_APP_VAPID_KEY;

const publicKey = 'BMjqzvXjNgfgWAgwfTWn14sDSXjvIHxL0V39iquGX1n6GbU_cnrlOKmAihKN1nv8dXNXfv0AJAU7TbVwA3d9fsE';

// Service Worker explicit registration to explicitly define sw location at a pat
// const swRegistration = async () => {
//   try {
//     await navigator.serviceWorker.register('../firebase-messaging-sw.js');
//   } catch (error) {
//     console.error('error');
//   }
// }
export const grabToken = async (setTokenFound) => {

  let currentToken = '';
  try {


    currentToken = await messaging.getToken({ vapidKey: publicKey, });
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


