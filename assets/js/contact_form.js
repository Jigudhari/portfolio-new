document.addEventListener("DOMContentLoaded", () => {
  const form     = document.getElementById("contactForm");
  const inputs   = {
    name:     document.getElementById("name"),
    email:    document.getElementById("email"),
    message:  document.getElementById("message")
  };
  const submitBtn = document.getElementById("submitBtn");

  const patterns = {
    name:    /^[A-Za-z\s]{2,40}$/,
    email:   /^[\w.-]+@([\w-]+\.)+[A-Za-z]{2,}$/,
    message: /[\S\s]{5,500}/
  };

  const errors = {
    name:    "Name is required",
    email:   "Valid email is required",
    message: "Message cannot be empty"
  };

  const validateField = key => {
    const field = inputs[key];
    const isValid = patterns[key].test(field.value.trim());
    const errMsg  = document.getElementById(`${key}Error`);

    if (isValid) {
      field.classList.remove("invalid");
      errMsg.textContent = "";
    } else {
      field.classList.add("invalid");
      errMsg.textContent = errors[key];
    }
    return isValid;
  };

  const toggleButton = () => {
    const allValid = Object.keys(inputs).every(validateField);
    submitBtn.disabled = !allValid;
  };

  Object.keys(inputs).forEach(key => {
    inputs[key].addEventListener("input", () => {
      validateField(key);
      toggleButton();
    });
  });

  form.addEventListener("submit", e => {
    if (!Object.keys(inputs).every(validateField)) {
      e.preventDefault();
    }
  });
});
