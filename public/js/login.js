document.getElementById("login-form").addEventListener("submit", e => {
  alert("you clicked me");
  e.preventDefault();
});

document.getElementById("login-form").addEventListener("submit", e => {
  e.preventDefault();
  fetch("api/customers", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }).then(data => {
    console.log(data);
  });
});
