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
      if (data.isValid) {
        // checking for client-type if its customer OR business-owner
        if (data.client_type === "business-owner") {
          // render salesDash 
          window.location.href = "/salesDash";
          console.log("client is a business owner");
          // display the first and lost name of the user on sidebar 

        } else {
          // client type is "customer" render StoreFront
          window.location.href = "/storeFront";
          console.log("client is a customer");
          // display the first and lost name of the user on sidebar 

        }
      } else {
        // checking if client-type is assigned as wrongPass OR notFound
        if (data.client_type === "wrongPass") {
          console.log("client is valid but typed worng password");
          // display error msg that pass is worng

        } else {
          console.log("client is not found");
          // display a msg that user is not found. type a correct email&pass OR create new account
          
        }
      }
    });
});
