document.addEventListener('DOMContentLoaded', function() {
    const signInForm = document.getElementById('sign-in-form');
    const errorMessage = document.getElementById('error-message');
  
    // Predefined credentials (for demonstration purposes)
    const validEmail = "info@example.com";
    const validPassword = "password123";
  
    signInForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
  
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
  
        // Simple validation (check if the email and password match predefined ones)
        if (email === validEmail && password === validPassword) {
            // Hide any previous error message
            errorMessage.style.display = 'none';
            // Redirect to the grocery page upon successful sign-in
            window.location.href = "addlist.html";
        } else {
            // Display error message if credentials are invalid
            errorMessage.style.display = 'block';
        }
    });
  
    const createAccountBtn = document.getElementById('create-account-btn');
    createAccountBtn.addEventListener('click', function() {
        // Redirect to the create account page (you can customize this)
        window.location.href = "createaccount.html";
    });
  });