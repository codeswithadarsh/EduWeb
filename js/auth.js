function signup() {
    const form = document.getElementById('signupForm');
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const imageFile = form.image.files[0];

    // Assuming you simply want to store the name of the file, not the file itself
    const reader = new FileReader();
    reader.onload = function(e) {
        const userData = {
            name: name,
            email: email,
            password: password,
            imageUrl: e.target.result  // this is the base64 image string
        };

        localStorage.setItem('user', JSON.stringify(userData));
        alert('Signup successful!');
        window.location.href = 'login.html';
    };
    reader.readAsDataURL(imageFile);
}

// Login Handle

function login() {
    const name = document.getElementsByName('name')[0].value;
    const email = document.getElementsByName('email')[0].value;
    const password = document.getElementsByName('pass')[0].value;
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData && userData.name === name && userData.email === email && userData.password === password) {
        alert('Login successful!');
        window.location.href = 'profile.html'; // Redirects to the profile page after successful login
    } else {
        alert('Incorrect email or password.');
    }
}


// logout

document.addEventListener('DOMContentLoaded', function() {
    const user = localStorage.getItem('user');
    const logoutButton = document.getElementById('logout-btn');
    const authButtons = document.getElementById('auth-buttons');

    if (user) {
        // User is logged in
        authButtons.children[0].style.display = 'none'; // Hide login
        authButtons.children[1].style.display = 'none'; // Hide register
        logoutButton.style.display = 'block'; // Show logout
    } else {
        // User is not logged in
        authButtons.children[0].style.display = 'block'; // Show login
        authButtons.children[1].style.display = 'block'; // Show register
        logoutButton.style.display = 'none'; // Hide logout
    }

    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('user');
        alert('You have been logged out.');
        window.location.href = 'index.html';
    });
});


// 