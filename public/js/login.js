document.addEventListener("DOMContentLoaded", event => {
  if (event) {
    console.info("Login DOM loaded 🚀");
  }

  /* eslint-disable prettier/prettier */
  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("email-address").value.trim();
    const passwordInput = document.getElementById("passwordInput").value.trim();

    fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
      }),
    }).then((res) => {
      console.log(res);
      window.location.href = res.url;
    });
    // .then((data) => {

    //   const userData = data.first_name + " " + data.last_name;
    //   const user = userData.toString();

    //   if (data.isValid) {
    //     // checking for client-type if its customer OR business-owner
    //     if (data.client_type === "business-owner") {
    //       // render salesDash
    //       window.location.href = "/createAccount";
    //       console.log("client is a business owner");
    //       // display the first and last name of the user on sidebar
    //       // console.log(user);
    //       // document.getElementById("loginUser").appendChild(user);

    //       // return user;
    //     } else {
    //       // client type is "customer" render StoreFront
    //       // window.location.href = "/storeFront";
    //       console.log("client is a customer");
    //       // display the first and last name of the user on sidebar
    //       // document.getElementById("loginUser").appendChild(user);
    //     }
    //   } else {
    //     // checking if client-type is assigned as wrongPass OR notFound
    //     if (data.client_type === "wrongPass") {
    //       alert("Wrong password, please try again!");
    //     } else {
    //       alert("User not found. Please try again or create an account.");
    //     }
    //   }
    // });
  });
});
