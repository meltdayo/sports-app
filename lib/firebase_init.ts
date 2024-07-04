import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaqhC8oSRmd5GL5Eb5-LuTltCKDFfqQjM",
  authDomain: "sports-app-25675.firebaseapp.com",
  projectId: "sports-app-25675",
  storageBucket: "sports-app-25675.appspot.com",
  messagingSenderId: "663667172232",
  appId: "1:663667172232:web:19885644048bddd162903d",
  measurementId: "G-DKS590DCRM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
