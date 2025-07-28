// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdfXKM80YauMJJLHrNnk6a1eXF2Lj6bxY",
  authDomain: "expense-tracker-38206.firebaseapp.com",
  projectId: "expense-tracker-38206",
  storageBucket: "expense-tracker-38206.firebasestorage.app",
  messagingSenderId: "1042923672031",
  appId: "1:1042923672031:web:87ee82c3d2e6c108c0746a",
  measurementId: "G-6X8Q03E859"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);