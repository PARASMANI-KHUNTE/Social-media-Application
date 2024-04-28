document.addEventListener('DOMContentLoaded', () => {


// script.js
console.log("js is working")
// Function to toggle password visibility
function togglePasswordVisibility(targetId) {
    const passwordInput = document.getElementById(targetId);
    const eyeBtn = document.getElementById(`toggle${targetId}Visibility`);
    
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeBtn.innerHTML = '<i class="far fa-eye-slash"></i>';
    } else {
        passwordInput.type = "password";
        eyeBtn.innerHTML = '<i class="far fa-eye"></i>';
    }
}

// Event listener for toggling password visibility
document.querySelectorAll('.eye-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        togglePasswordVisibility(targetId);
    });
});

// Event listener for showing login form and hiding signup form
document.getElementById('loginButton').addEventListener('click', () => {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('signupForm').classList.add('hidden');
});

// Event listener for showing signup form and hiding login form
document.getElementById('signupButton').addEventListener('click', () => {
    document.getElementById('signupForm').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
});






// Function to handle form submission for login
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await axios.post('/login', { username, password });
        console.log(response.data);
        
       // Redirect to home page on successful login with username as query parameter
       window.location.href = `/home.html?username=${encodeURIComponent(username)}`;
    } catch (error) {
        console.error('Login failed:', error.response.data.message);
        alert('Login failed: ' + error.response.data.message);
        try {
            const response = await axios.post('/logout', { username });
            console.log(response.data);
            alert('Logout successful');
            // Redirect user to login page or perform any other action
            window.location.href = '/index.html';
        } catch (error) {
            console.error('Logout failed:', error.response.data.message);
            alert('Logout failed: ' + error.response.data.message);
        }
    }
});



document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('signupUsername').value;
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupPasswordConfirm').value;

    // Perform client-side validation here if necessary

    // Check if passwords match
    if (password !== confirmPassword) {
        console.error('Passwords do not match');
        alert('Passwords do not match');
        return;
    }

    try {
        const response = await axios.post('/signup', { username, name, email, password });
        console.log(response.data);
        alert("Signup successful. Please log in now.");
        document.getElementById('loginForm').classList.remove('hidden');
        document.getElementById('signupForm').classList.add('hidden');
    } catch (error) {
        console.error('Signup failed:', error.response.data.message);
        if (error.response.status === 400 && error.response.data.message === 'Username or email already exists') {
            alert('Username or email already exists. Please choose a different one.');
        } else {
            alert('Signup failed: ' + error.response.data.message);
        }
    }
});




// document.getElementById('logoutBtn').addEventListener('click', async () => {
//     try {
//         // Send logout request to server
//         const response = await axios.post('/logout', { username }); // Assuming 'username' is accessible here
//         console.log(response.data);
//         alert('Logout successful');
//     } catch (error) {
//         console.error('Logout failed:', error.response.data.message);
//         alert('Logout failed: ' + error.response.data.message);
//     }
// });




// // Get the logout button element
// const logoutBtn = document.getElementById('logoutBtn');

// // Add event listener to logout button
// logoutBtn.addEventListener('click', async () => {
//     try {
//         // Send logout request to server
//         const response = await axios.post('/logout', { username }); // Assuming 'username' is accessible here
//         console.log(response.data);
//         alert('Logout successful');
//     } catch (error) {
//         if (error.response && error.response.data) {
//             console.error('Logout failed:', error.response.data.message);
//             alert('Logout failed: ' + error.response.data.message);
//         } else {
//             console.error('Logout failed:', error.message);
//             alert('Logout failed: ' + error.message);
//         }
//     }
// });

// // Show the logout button if the user is already logged in
// const alertMessage = "User already exists"; // Replace with the actual alert message
// if (alertMessage === "User already exists") {
//     logoutBtn.classList.remove('hidden');
// }


// Function to toggle the visibility of the post form
function togglePostForm() {
    const postForm = document.getElementById('postForm');
    if (postForm.classList.contains('hidden')) {
        postForm.classList.remove('hidden');
    } else {
        postForm.classList.add('hidden');
    }
}

// Function to hide the post form after submission
document.getElementById('postForm').addEventListener('submit', () => {
    const postForm = document.getElementById('postForm');
    postForm.classList.add('hidden');
});





















































































































});