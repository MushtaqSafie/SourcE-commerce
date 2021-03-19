// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", event => {
  if (event) {
    console.info("Create DOM loaded 🚀");
  }

  // Form references
  const fnInput = document.getElementById("first-name");
  const lnInput = document.getElementById("last-name");
  const phoneInput = document.getElementById("phone-number");
  const emailInput = document.getElementById("email-address");
  const passwordInput = document.getElementById("passwordInput");
  const confirmPasswordInput = document.getElementById("confirmPasswordInput");
  const createForm = document.getElementById("create-form");

  // Event handler for when form is submitted
  const handleFormSubmit = e => {
    e.preventDefault();

    // Make sure the form isn"t empty
    if (
      !fnInput.value.trim() ||
      !lnInput.value.trim() ||
      !phoneInput.value.trim() ||
      !emailInput.value.trim() ||
      !passwordInput.value.trim() ||
      !confirmPasswordInput.value.trim()
    ) {
      return;
    }

    // Object that will be sent to the db
    const newAcct = {
      first_name: fnInput.value.trim(),
      last_name: lnInput.value.trim(),
      phone_number: phoneInput.value.trim(),
      email: emailInput.value.trim(),
      user_password: passwordInput.value.trim()
    };

    createAcct(newAcct);
  };

  createForm.addEventListener("submit", handleFormSubmit);

  // Submits new acct details then redirects
  const createAcct = acct => {
    fetch("/api/customers", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(acct)
    })
      .then(data => {
        console.log(data);
        // window.location.href = "/";
      })
      .catch(err => console.error(err));
  };
});
