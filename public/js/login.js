document.getElementById("login-form").addEventListener("submit", e => {
  alert("you clicked me");
  e.preventDefault();
});

document.getElementById("login-form").addEventListener("submit", e => {
  e.preventDefault();
  fetch("api/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: "bryanmeow@me.com",
      password: "password"
    })
  }).then(data => {
    console.log(data);
  });
});


