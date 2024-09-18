document.getElementById('createAccountForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // You can add form validation or user registration logic here

    // Simulate a successful registration and redirect to sign-in page
    alert('Account created successfully! Redirecting to sign-in page...');
    window.location.href = 'signin.html'; // Redirect to sign-in page
});
