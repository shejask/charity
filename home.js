// import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

// // Initialize Firebase app (you can reuse the existing initialization code)
// const firebaseConfig = {
//     apiKey: "AIzaSyDA1ufLnKII3J72aqdPW_5ePacTWBiEgHg",
//     authDomain: "share2care-99b93.firebaseapp.com",
//     databaseURL: "https://share2care-99b93-default-rtdb.firebaseio.com",
//     projectId: "share2care-99b93",
//     storageBucket: "share2care-99b93.appspot.com",
//     messagingSenderId: "749651496086",
//     appId: "1:749651496086:web:e9cb696743d37f367486b7"
//   };
//   const app = initializeApp(firebaseConfig);
//   const auth = getAuth(app);

// // Function to display user profile
// function displayUserProfile(user) {
//   const profileContainer = document.getElementById('profile-container');

//   if (user) {
//     // User is signed in
//     const displayName = user.displayName || 'Anonymous';
//     const phoneNumber = user.phoneNumber || 'Not provided';
//     const gender = user.gender || 'Not provided';

//     profileContainer.innerHTML = `
//       <p>Welcome, ${displayName}!</p>
//       <p>Email: ${user.email}</p>
//       <p>Phone: ${phoneNumber}</p>
//       <p>Gender: ${gender}</p>
//       <button id="sign-out-btn">Sign Out</button>
//     `;

//     // Sign-out button event listener
//     const signOutBtn = document.getElementById('sign-out-btn');
//     signOutBtn.addEventListener('click', () => {
//       signOut(auth).then(() => {
//         // Redirect to the login page after sign-out
//         window.location.href = 'index.html';
//       }).catch((error) => {
//         console.error("Error signing out:", error);
//       });
//     });
//   } else {
//     // User is signed out
//     profileContainer.innerHTML = '<p>Welcome to the Home Page!</p>';
//   }
// }

// // Listen for changes in authentication state
// onAuthStateChanged(auth, (user) => {
//   displayUserProfile(user);
// });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Your existing Firebase configuration and setup code
// main.js

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js';
import { getDatabase, ref, push, serverTimestamp,onValue } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-database.js';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-storage.js';

// Initialize Firebase with your project configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Get a reference to the database
const database = getDatabase(firebaseApp);
 




document.addEventListener('DOMContentLoaded', function () {
    const postButton = document.getElementById('postButton');
    const photoInput = document.getElementById('photo');
    const postsContainer = document.getElementById('postsContainer');

    // Function to display posts
    function displayPosts() {
        const postsRef = ref(database, 'posts');
        onValue(postsRef, (snapshot) => {
            postsContainer.innerHTML = ''; // Clear previous posts

            if (snapshot.exists()) {
                const posts = snapshot.val();
                Object.keys(posts).forEach((postId) => {
                    const post = posts[postId];
                    const postDiv = document.createElement('div');
                    postDiv.className = 'mb-4';

                    // Display post details
                    postDiv.innerHTML = `
                         


                        <div class=" ml-3 rounded h-96  flex justify-center items-center  ">
  <div class="h-92 bg-gray-200 rounded border border-black"> 
  <div class="flex flex-col   ">
    <div class=""></div>
    <div class="  w-92 h-48 flex items-center justify-center">
      <div class="bg-cover bg-center w-full h-full" style="background-image: url('${post.photoURL}');">
          <!-- Content inside the div goes here -->
      </div>
  </div>
  <div class=" ml-2 w-96 h-10 mt-2"><h2 class="text-2xl font-semibold">${post.heading}</h2></div>
  <div class=" ml-2  w-96 h-20 mt-2"> <p class="text-sm font-semibold">${post.description}</p> </div>
<div class="  w-full mb-2"><div class="ml-64"> <button class=" bg-white rounded   py-2 px-4 text-sm text-indigo-500 font-medium ">Donate Now</button></div>  </div>
</div>
</div>
</div>
                    `;

                    postsContainer.appendChild(postDiv);
                });
            }
        });
    }

    // Function to delete a post
    window.deletePost = function (postId) {
        const postRef = ref(database, 'posts/' + postId);
        remove(postRef)
            .then(() => {
                alert('Post deleted successfully!');
                displayPosts(); // Refresh the displayed posts after deletion
            })
            .catch((error) => {
                console.error('Error deleting post:', error);
            });
    };

    // Display existing posts on page load
    displayPosts();

    // Your existing postButton event listener here

});









///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Reference to the "donations" node in your database
const donationsRef = ref(database, 'donations');

// Reference to the HTML container for donations
const donationsContainer = document.getElementById('donationsContainer');

// Function to delete a donation
function deleteDonation(donationId) {
  // Reference to the specific donation in the database
  const donationRefToDelete = ref(database, `donations/${donationId}`);

  // Remove the donation from the database
  remove(donationRefToDelete)
    .then(() => {
      console.log(`Donation with ID ${donationId} deleted successfully.`);
    })
    .catch((error) => {
      console.error('Error deleting donation:', error.message);
    });
}

// Listen for changes to the donations node
onValue(donationsRef, (snapshot) => {
  const donationsData = snapshot.val();

  if (donationsData) {
    // Clear previous content in the container
    donationsContainer.innerHTML = '';

    // Loop through each donation
    Object.entries(donationsData).forEach(([donationId, donation]) => {
      const { address, bloodGroup, hospitalName, patientName, timestamp } = donation;

      // Create a div for each donation
      const donationDiv = document.createElement('div');
      donationDiv.className = 'mb-4 p-4 border rounded';

      // Populate the div with donation information
      donationDiv.innerHTML = `
      <h2>Urgent Blood Need</h2>

      <p>Blood Group: ${bloodGroup}</p>
        <p hidden>Donation ID: ${donationId}</p>
        <p>Address: ${address}</p>
        <p>Blood Group: ${bloodGroup}</p>
        <p>Hospital Name: ${hospitalName}</p>
        <p>Patient Name: ${patientName}</p>
        <p>Times& Date: ${new Date(timestamp).toLocaleString()}</p>
       `;

      // Attach click event listener to the delete button 

      // Append the donation div to the container
      donationsContainer.appendChild(donationDiv);
    });
  } else {
    // Display a message if no donations are found
    donationsContainer.innerHTML = '<p>No donations found.</p>';
  }
}, {
  onlyOnce: false // Set to true if you only want to fetch the data once
});
