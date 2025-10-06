// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCy9Bp9n_PmniYGFOPZLNqKmsMP9R4nh1M",
  authDomain: "wedding-app-bd092.firebaseapp.com",
  projectId: "wedding-app-bd092",
  storageBucket: "wedding-app-bd092.firebasestorage.app",
  messagingSenderId: "133121466691",
  appId: "1:133121466691:web:1c71d73d2425ac4d6c4ff6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app;