document.getElementById("login-form").addEventListener("submit", e => {
  e.preventDefault();
  fetch("/api/index", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: document.getElementById("email-address").value.trim(),
      password: document.getElementById("passwordInput").value.trim()
    })
  })
    .then(res => res.json())
    .then(data => {
      // eslint-disable-next-line eqeqeq
      if (data.isValid == "true") {
        window.location.href = "/salesDash";
      } else {
        // the is login user is not valid display a message in <div id='notValid-message'>
      }
    });
});
