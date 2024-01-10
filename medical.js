import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js';
import { getDatabase, ref, push, serverTimestamp, set } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-database.js';

// Initialize Firebase with your project configuration
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

// Get a reference to the database
const database = getDatabase(firebaseApp);

// Reference to the root of your data in the database
const dataRef = ref(database, 'medicines');

// Function to save data to the database
function saveDataToDatabase(currentUserId) {
  // Get values from the input fields
  const typeOf = document.getElementById('typeOfMedicineInput').value;
  const quantity = document.getElementById('quantity').value;
  const notes = document.getElementById('notes').value;

  // Create an object with the input data and user ID
  const newData = {
    typeOf,
    quantity,
    notes,
    timestamp: serverTimestamp(),
    userId: currentUserId, // Add the user ID to the data
    // Add other properties as needed
  };

  // Reference to the user's medicines node
  const userMedicinesRef = ref(database, `users/${currentUserId}/medicines`);

  // Save the medicine data directly without a unique ID
  set(userMedicinesRef, newData);

  console.log('Medicine associated with user:', currentUserId);
}

// Add an event listener to the "Donate" button
document.getElementById('donateButton').addEventListener('click', function () {
  const params = new URLSearchParams(window.location.search);
  const currentUserId = params.get('userId');
  console.log('User ID:', currentUserId);

  // Check if the user ID is a valid string before calling the saveDataToDatabase function
  if (typeof currentUserId === 'string' && currentUserId.trim() !== '') {
    // Call the saveDataToDatabase function with the current user ID
    saveDataToDatabase(currentUserId);
  } else {
    console.error('Invalid user ID:', currentUserId);
  }
});

// Other parts of your code...
document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  const currentUserId = params.get('userId');
  console.log('User ID:', currentUserId);

  // Check if the user ID is a valid string before further processing
  if (typeof currentUserId === 'string' && currentUserId.trim() !== '') {
    // Your existing code here...
    // For example, you can call the function saveDataToDatabase with the user ID
    // saveDataToDatabase(currentUserId);

  } else {
    console.error('Invalid user ID:', currentUserId);
  }
});





////////////////////////////////////////////////////////////////////////////////////////////////
 