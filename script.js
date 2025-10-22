const timeElement = document.querySelector('[data-testid="test-user-time"]');
function updateTime() {
  timeElement.textContent = Date.now();
}
updateTime();
setInterval(updateTime, 1000);
// Contact Form Validation - Fixed Version
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("success-message");

  // Form fields
  const nameInput = document.querySelector('[data-testid="test-contact-name"]');
  const emailInput = document.querySelector(
    '[data-testid="test-contact-email"]'
  );
  const subjectInput = document.querySelector(
    '[data-testid="test-contact-subject"]'
  );
  const messageInput = document.querySelector(
    '[data-testid="test-contact-message"]'
  );

  // Error message elements
  const nameError = document.querySelector(
    '[data-testid="test-contact-error-name"]'
  );
  const emailError = document.querySelector(
    '[data-testid="test-contact-error-email"]'
  );
  const subjectError = document.querySelector(
    '[data-testid="test-contact-error-subject"]'
  );
  const messageError = document.querySelector(
    '[data-testid="test-contact-error-message"]'
  );

  // Validation functions
  function validateName(value) {
    if (!value.trim()) {
      return "Full name is required";
    }
    return "";
  }

  function validateEmail(value) {
    if (!value.trim()) {
      return "Email is required";
    }

    // Email regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      return "Please enter a valid email address (e.g., name@example.com)";
    }

    return "";
  }

  function validateSubject(value) {
    if (!value.trim()) {
      return "Subject is required";
    }
    return "";
  }

  function validateMessage(value) {
    if (!value.trim()) {
      return "Message is required";
    }

    if (value.trim().length < 10) {
      return "Message must be at least 10 characters long";
    }

    return "";
  }

  // Display error message
  function showError(input, errorElement, message) {
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = "block";
    }
    if (input) {
      input.classList.add("error");
      input.setAttribute("aria-invalid", "true");
    }
  }

  // Clear error message
  function clearError(input, errorElement) {
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }
    if (input) {
      input.classList.remove("error");
      input.setAttribute("aria-invalid", "false");
    }
  }

  // Validate single field
  function validateField(input, errorElement, validationFn) {
    const errorMessage = validationFn(input.value);

    if (errorMessage) {
      showError(input, errorElement, errorMessage);
      return false;
    } else {
      clearError(input, errorElement);
      return true;
    }
  }

  // Real-time validation on blur
  if (nameInput) {
    nameInput.addEventListener("blur", function () {
      validateField(nameInput, nameError, validateName);
    });

    nameInput.addEventListener("input", function () {
      if (nameError && nameError.textContent) {
        clearError(nameInput, nameError);
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener("blur", function () {
      validateField(emailInput, emailError, validateEmail);
    });

    emailInput.addEventListener("input", function () {
      if (emailError && emailError.textContent) {
        clearError(emailInput, emailError);
      }
    });
  }

  if (subjectInput) {
    subjectInput.addEventListener("blur", function () {
      validateField(subjectInput, subjectError, validateSubject);
    });

    subjectInput.addEventListener("input", function () {
      if (subjectError && subjectError.textContent) {
        clearError(subjectInput, subjectError);
      }
    });
  }

  if (messageInput) {
    messageInput.addEventListener("blur", function () {
      validateField(messageInput, messageError, validateMessage);
    });

    messageInput.addEventListener("input", function () {
      if (messageError && messageError.textContent) {
        clearError(messageInput, messageError);
      }
    });
  }

  // Form submission
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      console.log("Form submitted"); // Debug log

      // Hide success message if visible
      if (successMessage) {
        successMessage.classList.remove("show");
        successMessage.style.display = "none";
      }

      // Validate all fields
      const isNameValid = validateField(nameInput, nameError, validateName);
      const isEmailValid = validateField(emailInput, emailError, validateEmail);
      const isSubjectValid = validateField(
        subjectInput,
        subjectError,
        validateSubject
      );
      const isMessageValid = validateField(
        messageInput,
        messageError,
        validateMessage
      );

      console.log("Validation results:", {
        name: isNameValid,
        email: isEmailValid,
        subject: isSubjectValid,
        message: isMessageValid,
      }); // Debug log

      // Check if all fields are valid
      const isFormValid =
        isNameValid && isEmailValid && isSubjectValid && isMessageValid;

      if (isFormValid) {
        console.log("Form is valid, showing success message"); // Debug log

        // Show success message
        if (successMessage) {
          successMessage.textContent =
            "Thank you for your message! I'll get back to you soon.";
          successMessage.classList.add("show");
          successMessage.style.display = "block";
        }

        // Reset form
        form.reset();

        // Clear any remaining error states
        clearError(nameInput, nameError);
        clearError(emailInput, emailError);
        clearError(subjectInput, subjectError);
        clearError(messageInput, messageError);

        // Scroll to success message
        if (successMessage) {
          successMessage.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });

          // Focus on success message for screen readers
          successMessage.setAttribute("tabindex", "-1");
          successMessage.focus();

          // Remove tabindex after focus
          setTimeout(function () {
            successMessage.removeAttribute("tabindex");
          }, 100);
        }
      } else {
        console.log("Form is invalid"); // Debug log

        // Focus on first invalid field
        const fields = [
          { input: nameInput, isValid: isNameValid },
          { input: emailInput, isValid: isEmailValid },
          { input: subjectInput, isValid: isSubjectValid },
          { input: messageInput, isValid: isMessageValid },
        ];

        const firstInvalidField = fields.find(function (field) {
          return !field.isValid;
        });

        if (firstInvalidField && firstInvalidField.input) {
          firstInvalidField.input.focus();
        }
      }
    });
  }
});
