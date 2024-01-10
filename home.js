// Your existing Firebase configuration and setup code
// main.js

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js';
import { getDatabase, ref, push, serverTimestamp, onValue, remove, set } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-database.js';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-storage.js';

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
const storage = getStorage(firebaseApp);

// Get a reference to the database
const database = getDatabase(firebaseApp);

document.addEventListener('DOMContentLoaded', function () {
    const postButton = document.getElementById('postButton');
    const photoInput = document.getElementById('photo');
    const postsContainer = document.getElementById('postsContainer');
    let currentUserId; // Declare a variable outside the event listener

    const params = new URLSearchParams(window.location.search);
    currentUserId = params.get('userId'); // Store the user ID in the variable

    // Use the currentUserId as needed in your code
    console.log('User ID:', currentUserId);



    updateBloodDonatorStatus(currentUserId); 


    
// Inside the onValue listener for donations
medical.addEventListener('click', () => {
  // Call a function to update the database when the button is clicked
  updateBloodDonatorStatus(currentUserId);

  // Redirect to medical.html with userId in the URL
  window.location.href = `medical.html?userId=${currentUserId}`;
});



// Inside the onValue listener for donations
food.addEventListener('click', () => {
    // Call a function to update the database when the button is clicked
    updateBloodDonatorStatus(currentUserId);
  
    // Redirect to medical.html with userId in the URL
    window.location.href = `Food.html?userId=${currentUserId}`;
  });



  
// Inside the onValue listener for donations
wheelchair.addEventListener('click', () => {
    // Call a function to update the database when the button is clicked
    updateBloodDonatorStatus(currentUserId);
  
    // Redirect to medical.html with userId in the URL
    window.location.href = `Wheelchair.html?userId=${currentUserId}`;
  });


  // Inside the onValue listener for donations
wheelchair.addEventListener('click', () => {
    // Call a function to update the database when the button is clicked
    updateBloodDonatorStatus(currentUserId);
  
    // Redirect to medical.html with userId in the URL
    window.location.href = `Wheelchair.html?userId=${currentUserId}`;
  });


  // Inside the onValue listener for donations
  Clothes.addEventListener('click', () => {
    // Call a function to update the database when the button is clicked
    updateBloodDonatorStatus(currentUserId);
  
    // Redirect to medical.html with userId in the URL
    window.location.href = `Clothes.html?userId=${currentUserId}`;
  });

  


  
  // Inside the onValue listener for donations
  Furniture.addEventListener('click', () => {
    // Call a function to update the database when the button is clicked
    updateBloodDonatorStatus(currentUserId);
  
    // Redirect to medical.html with userId in the URL
    window.location.href = `Furniture.html?userId=${currentUserId}`;
  });



    // Fetch user data based on the currentUserId
    fetchUserData(currentUserId);

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
                    <div class="bg-gray-200 flex flex-col ">
                        <div class="ml-10 "> 
                            <h2 class="text-2xl rounded-xl pt-4 font-medium">Urgent Blood Need</h2>
                            <p class="mt-3">Blood Group: ${bloodGroup}</p>
                            <p hidden>Donation ID: ${donationId}</p>
                            <p class="mt-3">Address: ${address}</p>
                            <p class="mt-3">Hospital Name: ${hospitalName}</p>
                            <p class="mt-3">Patient Name: ${patientName}</p>
                            <p class="mt-3">Times & Date: ${new Date(timestamp).toLocaleString()}</p>
                            <button class="bg-indigo-500 mb-5 w-24 h-10 text-white font-medium rounded-lg mt-5" id="Donateblood">Donate</button>
                        </div>
                    </div>
                `;

                // Attach click event listener to the "Donate" button
                const donateButton = donationDiv.querySelector('#Donateblood');
                donateButton.addEventListener('click', () => {
                    // Call a function to update the database when the button is clicked
                    updateBloodDonatorStatus(currentUserId);
                });

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

    // Function to fetch user data based on userId
    function fetchUserData(userId) {
        const userRef = ref(database, `users/${userId}`);

        onValue(userRef, (snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                console.log('User Data:', userData);
                // Do something with the user data, e.g., update the UI
            } else {
                console.log('User not found.');
            }
        });
    }

    // Function to update the bloodDonator status in the database
    function updateBloodDonatorStatus(userId) {
        const userBloodDonatorRef = ref(database, `users/${userId}/bloodDonator`);

        // Set the value to "yes"
        set(userBloodDonatorRef, 'yes')
            .then(() => {
                console.log('Blood donation status updated successfully.');
            })
            .catch((error) => {
                console.error('Error updating blood donation status:', error);
            });
    }

    // Function to save post information to user's array on button click// Function to save post information to user's array on button click
// Function to save post information to user's array on button click
// Function to save post information to user's array on button click
// Function to save post information to user's array on button click// Variable to track whether data has already been saved
 
// Function to save post information to user's array on button click
// Function to save post information to user's array on button click
function savePostToUserArray(userId, postInfo) {
  const userPostsArrayRef = ref(database, `users/${userId}/posts`);

  // Push the postInfo into the existing array
  push(userPostsArrayRef, postInfo)
      .then(() => {
          console.log('Post added to user\'s array successfully.');
      })
      .catch((error) => {
          console.error('Error adding post to user\'s array:', error);
      });
}


 




    // Event listener for the "Donate Now" button inside postDiv
    postsContainer.addEventListener('click', (event) => {
        const donateNowButton = event.target.closest('.bg-white');

        if (donateNowButton) {
            // Extract post heading from the clicked post
            const postHeading = donateNowButton.closest('.flex').querySelector('h2').innerText;

            // Create postInfo object
            const postInfo = {
                heading: postHeading
            };

            // Call the function to save postInfo to user's array
            savePostToUserArray(currentUserId, postInfo);
        }
    });
});










///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
document.getElementById('mediapost').addEventListener('click', function () {
    // Get values from the form
    const mediaDescription = document.getElementById('mediadescription').value;
    const mediaImageInput = document.getElementById('mediaimage');
  
    // Check if an image is selected
    if (mediaImageInput.files.length > 0) {
      // Upload the image to Firebase Storage
      const imageFile = mediaImageInput.files[0];
      const storageReference = storageRef(storage, 'images/' + imageFile.name); // Rename the variable
  
      uploadBytes(storageReference, imageFile).then((snapshot) => {
        // Get the download URL of the uploaded image
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          // Save the post data to the database
          saveToDatabase(mediaDescription, downloadURL);
        });
      });
    } else {
      // No image selected, save only the text
      saveToDatabase(mediaDescription, null);
    }
  });
  
  function saveToDatabase(description, imageUrl) {
    // Reference to the 'posts' node in the database
    const postsRef = ref(database, 'mediaposts');
  
    // Push a new post to the database
    const newPostRef = push(postsRef);
  
    // Set the post data
    set(newPostRef, {
      description: description,
      imageUrl: imageUrl,
      timestamp: serverTimestamp(),
    });
  
    // Clear the form after posting
    document.getElementById('mediadescription').value = '';
    document.getElementById('mediaimage').value = ''; // Clear the file input
  }
  
  
  ///////////////////////////////////////////////////////////////////////////////
// Function to display all media posts
function displayAllMediaPosts() {
    const allMediaPostsContainer = document.getElementById('allmediaposts');
    const mediaPostsRef = ref(database, 'mediaposts');

    onValue(mediaPostsRef, (snapshot) => {
        allMediaPostsContainer.innerHTML = ''; // Clear previous media posts

        if (snapshot.exists()) {
            const mediaPosts = snapshot.val();
            Object.keys(mediaPosts).forEach((postId) => {
                const mediaPost = mediaPosts[postId];
                const mediaPostDiv = document.createElement('div');
                mediaPostDiv.className = 'flex flex-col';

                // Display media post details
                mediaPostDiv.innerHTML = `
          
<div class"mt-5  ">
                    <div class="w-full h-64 bg-black mt-2" style="background-image: url('${mediaPost.imageUrl}');"></div>

                    <div class="">
                        <p class="whitespace mt-2"></p>
                        <div class="border-t border-gray-800 mt-2">${mediaPost.description}</div>
                        <h6 class="font-medium mt-2">${new Date(mediaPost.timestamp).toLocaleString()}</h6>
                    </div>

                    </div>

                `;

                allMediaPostsContainer.appendChild(mediaPostDiv);
            });
        } else {
            // Display a message if no media posts are found
            allMediaPostsContainer.innerHTML = '<p>No media posts found.</p>';
        }
    });
}

// Call the function to display all media posts on page load
displayAllMediaPosts();
