// Firebase configuration (you already have this)
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCJGxc8zWgObHsAYAzFYMQZ2Tg7-yiMtqk",
  authDomain: "codeprofile-bd99a.firebaseapp.com",
  projectId: "codeprofile-bd99a",
  storageBucket: "codeprofile-bd99a.firebasestorage.app",
  messagingSenderId: "262180378334",
  appId: "1:262180378334:web:a7dc41bfeecca8e4e1944f",
  measurementId: "G-010CT2T94C"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

