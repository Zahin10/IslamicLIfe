// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByXLuKbqXrSn_VqWq1HLFMyeGs5lWmMg8",
  authDomain: "islam-73962.firebaseapp.com",
  projectId: "islam-73962",
  storageBucket: "islam-73962.appspot.com",
  messagingSenderId: "597800622089",
  appId: "1:597800622089:web:0fd2a0c18c57fe9c4840d8",
  measurementId: "G-2RZ376VDWL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    
    const response = await fetch('/sessionLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    if (response.ok) {
      window.location.href = '/dashboard';
    }
  } catch (error) {
    console.error('Error logging in:', error);
    alert('Login failed. Please check your credentials.');
  }
});