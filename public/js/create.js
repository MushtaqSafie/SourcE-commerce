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

  // Event handler for when form is submitted
  //const handleFormSubmit = e => {
  document.getElementById("create-form").addEventListener("submit", e => {
    e.preventDefault();
    const userData = {
      first_name: fnInput.value.trim(),
      last_name: lnInput.value.trim(),
      email: emailInput.value.trim(),
      user_password: passwordInput.value.trim(),
      confirmPassword: confirmPasswordInput.value.trim()
    };
    if (
      !userData.fnInput ||
      !userData.lnInput.value.trim() ||
      !userData.emailInput.value.trim() ||
      !userData.passwordInput.value.trim() ||
      !userData.confirmPasswordInput.value.trim()
    ) {
      alert("Fields cannot be blank!");
      return;
    }
  });
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
