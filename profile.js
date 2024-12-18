function toggleForm() {
    const isSignUp = document.getElementById('formTitle').innerText === "Sign Up";
    document.getElementById('formTitle').innerText = isSignUp ? "Login" : "Sign Up";
    document.getElementById('confirmPasswordContainer').style.display = isSignUp ? 'none' : 'block'; //none:hide, block:visible
    document.getElementById('formSubmitButton').innerText = isSignUp ? "Login" : "Sign Up";
    document.getElementById('toggleForm').innerText = isSignUp ? "Don't have an account? Sign up here." : "Already have an account? Login here.";
}

function validateForm() {
    clearErrors();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const isSignUp = document.getElementById('formTitle').innerText === "Sign Up";
    let isValid = true;

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showError('email', "Invalid email format");
        isValid = false;
    }

    // Password validation
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
        showError('password', "Must be at least 8 characters, contain one uppercase letter, one number, and one special character.");
        isValid = false;
    }

    // Confirm password validation for sign-up
    if (isSignUp && password !== confirmPassword) {
        showError('confirmPassword', "Passwords do not match.");
        isValid = false;
    }

    // If form is valid, show success message
    if (isValid) {
        alert("Form submitted successfully!");
        document.getElementById('authForm').reset();
    }

    return isValid;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add("error");//add css class to display error message

    // Create and display error message
    const errorMessage = document.createElement("div"); // creates div to hold error msg
    errorMessage.className = "error-message";      // assigning the css class to div 
    errorMessage.textContent = message;
    field.parentNode.insertBefore(errorMessage, field.nextSibling);  // gets the paren, insert msg before its next sibling
}

function clearErrors() {
    // Remove error messages and red outlines
    document.querySelectorAll(".error-message").forEach(error => error.remove());
    document.querySelectorAll(".error").forEach(field => field.classList.remove("error"));
}
