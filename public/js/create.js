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
    const businessInput = document.getElementById("business-name").value.trim();
    const phoneInput = document.getElementById("business-name").value.trim();
    const businessSelect = document.getElementById("businessSelect").checked;

    const userData = {
      firstName: fnInput,
      lastName: lnInput,
      emailAddress: emailInput,
      password: passwordInput,
      confirmPassword: confirmPasswordInput,
      businessName: businessInput,
      phoneNumber: phoneInput,
      selectBusiness: businessSelect
    };

    fetch("/createAccount", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    }).then(result => {
      console.log(result);
      window.location.href = result.url;
    });
    // .then(data => {
    //   window.location.href = "/";
    //   console.log(result);
    //   console.log(data);

    // ! Click listener if checkbox ticked, client type === "business-owner"
    // get element by id for checkbox~
    // if (data.isValid) {
    // checking for client-type if its customer OR business-owner
    //   if (data.client_type === "business-owner") {
    // client type is "business-owner", render login
    //     window.location.href = "/";
    //     console.log("client is a business owner");
    //   } else {
    // client type is "customer", render login
    //     window.location.href = "/";
    //     console.log("client is a customer");
    //   }
    // }
    // });
  });
});
