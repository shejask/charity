// Import Firebase SDK from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
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
        const imageRef = storageRef(storage, `user_images/${user.uid}`); // Use user's UID as the image reference
        await uploadBytes(imageRef, image);

        // Get the download URL of the uploaded image
        const imageURL = await getDownloadURL(imageRef);

        // Save additional user data to Firebase Realtime Database
        const database = getDatabase(firebaseApp);
        const usersRef = ref(database, 'users');

        // Save the user data using the user's UID as the key
        const response = await set(ref(database, `users/${user.uid}`), {
            name,
            email,
            age,
            image: imageURL
        });
         

          // Redirect to home.html after successful registration
         // Redirect to home.html after successful registration with user ID as a query parameter
window.location.href = `home.html?userId=${user.uid}`;

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








