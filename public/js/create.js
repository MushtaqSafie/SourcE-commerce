document.addEventListener("DOMContentLoaded", event => {
  if (event) {
    console.info("Create DOM loaded 🚀");
  }
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
    console.log("something");
    fetch("/api/createAccount", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    }).then(result => {
      console.log(result);
    });
  });
});
