/* eslint-disable prettier/prettier */
document.getElementById("login-form").addEventListener("submit", e => {
  e.preventDefault();
  const emailInput = document.getElementById("email-address").value.trim();
  const passwordInput = document.getElementById("passwordInput").value.trim();

  fetch("/api/index", {
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
      // eslint-disable-next-line eqeqeq
      if (data.isValid) {
        switch (data.client_type) {
        case "customer":
          window.location.href = "/storeFront";
          break;
        case "business-owner":
          window.location.href = "/salesDash";
          break;
        default:
          break;
        }
      } else {
        // the is login user is not valid display a message 
      }
    });
});
