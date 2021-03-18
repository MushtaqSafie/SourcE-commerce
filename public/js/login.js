document.getElementById("login-form").addEventListener("submit", e => {
  e.preventDefault();
  fetch("/api/index", {
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
 /* if (email === true && password === true) {
    res send 
  }*/
});
