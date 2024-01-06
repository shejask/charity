// Import Firebase SDK from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Initialize Firebase with your config
const firebaseConfig = {
  apiKey: "AIzaSyDA1ufLnKII3J72aqdPW_5ePacTWBiEgHg",
  authDomain: "share2care-99b93.firebaseapp.com",
  databaseURL: "https://share2care-99b93-default-rtdb.firebaseio.com",
  projectId: "share2care-99b93",
  storageBucket: "share2care-99b93.appspot.com",
  messagingSenderId: "749651496086",
  appId: "1:749651496086:web:e9cb696743d37f367486b7"
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const alertDiv = document.getElementById('alert');

  form.addEventListener('submit', async function (event) {
      event.preventDefault();
      const formData = new FormData(form);
      const { name, email, password, age, image } = Object.fromEntries(formData);

      // Create a new user with email and password
      const auth = getAuth(firebaseApp);
      try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;

          // Upload image to Firebase Storage
          const storage = getStorage(firebaseApp);
          const imageRef = storageRef(storage, `user_images/${name}`);
          await uploadBytes(imageRef, image);

          // Get the download URL of the uploaded image
          const imageURL = await getDownloadURL(imageRef);

          // Save additional user data to Firebase Realtime Database
          const database = getDatabase(firebaseApp);
          const usersRef = ref(database, 'users');

          // Save the user data using the name as the key
          await set(ref(database, `users/${name}`), { name, email, age, image: imageURL });

          console.log('User data and image saved successfully');

          // Redirect to home.html after successful registration
          window.location.href = 'home.html';
      } catch (error) {
          console.error('Error creating user:', error);

          // Display error message in the alert div
          alertDiv.textContent = error.code === 'auth/email-already-in-use'
              ? 'Email address is already in use. Please use a different email address.'
              : 'Error creating user. Please try again.';

          // Show the alert div
          alertDiv.classList.remove('hidden');

          // Refresh the page after 3 seconds
          setTimeout(function () {
              location.reload();
          }, 3000);
      }
  });
});
