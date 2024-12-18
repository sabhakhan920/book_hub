document.getElementById("contactForm").onsubmit = function (event) {
    event.preventDefault(); // Prevent form submission

    clearErrors();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;
    let isValid = true;

    // Name validation
    if (!name) {
        showError("name", "Please enter your name.");
        isValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showError("email", "Please enter a valid email address.");
        isValid = false;
    }

    // Phone validation (10 digits)
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
        showError("phone", "Please enter a valid 10-digit phone number.");
        isValid = false;
    }

    // Message validation
    if (!message) {
        showError("message", "Please enter a message.");
        isValid = false;
    }

    // Show success message if form is valid
    if (isValid) {
        alert("Thank you for your message! We'll get back to you soon.");
        document.getElementById("contactForm").reset();
    }
};

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add("error");

    // Create and display error message
    const errorMessage = document.createElement("div");
    errorMessage.className = "error-message";
    errorMessage.textContent = message;
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
}

function clearErrors() {
    // Remove error messages and red outlines
    document.querySelectorAll(".error-message").forEach(error => error.remove());
    document.querySelectorAll(".error").forEach(field => field.classList.remove("error"));
}
