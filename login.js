
// Import Firebase SDK from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Initialize Firebase with your config
const firebaseConfig = {
    apiKey: "AIzaSyAiMI3WBXVgZaPoyQSiAZZ2NELIO-IDvls",
    authDomain: "shajeee-ab31e.firebaseapp.com",
    databaseURL: "https://shajeee-ab31e-default-rtdb.firebaseio.com",
    projectId: "shajeee-ab31e",
    storageBucket: "shajeee-ab31e.appspot.com",
    messagingSenderId: "579182396902",
    appId: "1:579182396902:web:2c00d03afe4299f5970227"
  };

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);







document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const alertDiv = document.getElementById('alert');
    const loginButton = document.getElementById('loginButton'); // Added this line

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;

        const auth = getAuth();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log('User logged in successfully');

            // Redirect to home.html after successful login
            window.location.href = 'home.html';
        } catch (error) {
            console.error('Error logging in:', error);

            // Display error message in the alert div
            alertDiv.textContent = error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password'
                ? 'Invalid email or password. Please try again.'
                : 'Error logging in. Please try again.';

            // Show the alert div
            alertDiv.classList.remove('hidden');
        }
    });
});
