document.addEventListener("DOMContentLoaded", event => {
  if (event) {
    console.info("Storefront DOM loaded");
  }

  const cartBtn = document.querySelectorAll(".cartBtnH");
  const cart = document.getElementById("cartId");
  console.log(cart);
  // -------- customer id needs to be update
  const customerDataId = document
    .getElementById("loginUser")
    .getAttribute("data-id");

  console.log(customerDataId);
  // Set up the event listener for the cart button
  if (cartBtn) {
    cartBtn.forEach(button => {
      button.addEventListener("click", e => {
        e.preventDefault();
        // Grabs the id of the element that goes by the name, "id"
        // quantity, customer id, product information
        //  document.getElementById("inventory-description").value.trim()
        const newCart = {
          ProductId: e.target.getAttribute("data-id"),
          CustomerId: customerDataId,
          quantity: 1,
          order_status: "cart-item"
        };
        const li = document.createElement("li");
        //element "TEST"
        //li.appendChild(document.createTextNode(e.target.value));

        cart.appendChild(li);
        cart.text = "test";
        // Send POST request to create a new quote
        fetch("/api/cartItem", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },

          // make sure to serialize the JSON body
          body: JSON.stringify(newCart)
        }).then(() => {
          // Empty the form

          // Reload the page so the user can see the new quote
          console.log("Created a new Cart Item");
          // location.reload();
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
