document.addEventListener("DOMContentLoaded", event => {
  if (event) {
    console.info("Storefront DOM loaded");
  }

  const cartBtn = document.querySelectorAll(".cartBtnH");

  // Set up the event listener for the cart button
  if (cartBtn) {
    cartBtn.forEach(button => {
      button.addEventListener("click", e => {
        e.preventDefault();
        // Grabs the id of the element that goes by the name, "id"
        //const id = e.target.getAttribute("data-id");
        const newCart = {
          product_name: document.getElementById("product-name").value.trim(),
          product_description: document
            .getElementById("inventory-description")
            .value.trim(),
          inventory: document.getElementById("inventory-quantity").value.trim()
        };
        //quantity
        //customer id
        //product information

        // Send POST request to create a new quote
        fetch("/api/orders", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },

          // make sure to serialize the JSON body
          body: JSON.stringify(newCart)
        }).then(() => {
          // Empty the form

          document.getElementById("product-name").value = "";
          document.getElementById("inventory-description").value = "";
          document.getElementById("inventory-quantity").value = "";

          // Reload the page so the user can see the new quote
          console.log("Created a new Cart Item");
          location.reload();
        });
      });
    });
  }

  //     const newCart = e.target.getAttribute("data-newcartitem");

  //     const newCartState = {
  //       Orders: productId,
  //       addToCart: newCart,
  //       addToCart: true
  //     };
  //     // addtocart true. So anything that has new , change to current.
  //     fetch("/api/orders", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       //quantity
  //       //customer id
  //       //product information

  //       //FOR SIDEBAR = cart-items
  //       // make sure to serialize the JSON body
  //       body: JSON.stringify(newCartState)
  //     }).then(response => {
  //       // Check that the response is all good
  //       // Reload the page so the user can see the new quote
  //       if (response.ok) {
  //         console.log(`changed cart to: ${newCart}`);
  //         location.reload("/");
  //       } else {
  //         alert("something went wrong!");
  //       }
  //     });
  //   });
  // });
});
