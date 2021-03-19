// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", event => {
  if (event) {
    console.info("Create DOM loaded 🚀");
  }

  // Form references
  const fnInput = document.getElementById("first-name");
  const lnInput = document.getElementById("last-name");
  const emailInput = document.getElementById("email-address");
  const passwordInput = document.getElementById("passwordInput");
  const confirmPasswordInput = document.getElementById("confirmPasswordInput");
  const businessInput = document.getElementById("business-name");
  const phoneInput = document.getElementById("phone-number");
  const createForm = document.getElementById("create-form");

  // Event handler for when form is submitted
  const handleFormSubmit = e => {
    e.preventDefault();

    // Make sure the form isn't empty
    if (
      !fnInput.value.trim() ||
      !lnInput.value.trim() ||
      !emailInput.value.trim() ||
      !passwordInput.value.trim() ||
      !confirmPasswordInput.value.trim()
    ) {
      alert("Fields cannot be blank!");
      return;
    }

    const newAcct = {
      first_name: fnInput.value.trim(),
      last_name: lnInput.value.trim(),
      email: emailInput.value.trim(),
      user_password: passwordInput.value.trim(),
      business_name: businessInput.value.trim(),
      phone_number: phoneInput.value.trim()
    };

    // Make sure passwords match
    if (passwordInput.value === confirmPasswordInput.value) {
      createAcct(newAcct);
    } else {
      alert("Passwords do not match!");
      return;
    }
  };

  createForm.addEventListener("submit", handleFormSubmit);

  document.getElementById("create-form").addEventListener("submit", e => {
    e.preventDefault();

    // Submits new acct details then redirects
    //const createAcct = acct => {
    console.log("something");
    fetch("/api/createAccount", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (passwordInput.value === confirmPasswordInput.value) {
          createAcct(newAcct);
          window.location.href = "/login";
        } else {
          alert("Passwords do not match!");
          window.location.href = "/createAccount";
          return;
        }
      });
  });
});
