//const { use } = require("../../routes/api-routes");
// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", event => {
  if (event) {
    console.info("Create DOM loaded 🚀");
  }

  // Form references
  // Event handler for when form is submitted
  //const handleFormSubmit = e => {
  document.getElementById("create-form").addEventListener("submit", e => {
    e.preventDefault();
    const fnInput = document.getElementById("first-name").value.trim();
    const lnInput = document.getElementById("last-name").value.trim();
    const emailInput = document.getElementById("email-address").value.trim();
    const passwordInput = document.getElementById("passwordInput").value.trim();
    const confirmPasswordInput = document
      .getElementById("confirmPasswordInput")
      .value.trim();

    const userData = {
      firstName: fnInput,
      lastName: lnInput,
      email: emailInput,
      password: passwordInput,
      confirmPassword: confirmPasswordInput
    };
    /*if (
      !userData.fnInput ||
      !userData.lnInput ||
      !userData.emailInput ||
      !userData.passwordInput ||
      !userData.confirmPasswordInput
    ) {
      alert("Fields cannot be blank!");
      return;
    }*/
    console.log("something");
    fetch("/api/createAccount", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userData
      })
    }).then(result => {
      console.log(result);
    });
  });
});
