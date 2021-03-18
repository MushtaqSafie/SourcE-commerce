document.addEventListener("DOMContentLoaded", event => {
  if (event) {
    console.info("DOM loaded");
  }

  const cartBtn = document.querySelectorAll(".cartBtnH");

  // Set up the event listener for the create button
  if (cartBtn) {
    cartBtn.forEach(button => {
      button.addEventListener("click", e => {
        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute("data-id");
        const newCart = e.target.getAttribute("data-newcartitem");

        const newCartState = {
          addToCart: newCart,
          addToCart: true
        };
        // addtocart true. So anything that has new , change to current.
        fetch(`/api/storefront/${id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          //FOR SIDEBAR = cart-items
          // make sure to serialize the JSON body
          body: JSON.stringify(newCartState)
        }).then(response => {
          // Check that the response is all good
          // Reload the page so the user can see the new quote
          if (response.ok) {
            console.log(`changed cart to: ${newCart}`);
            location.reload("/");
          } else {
            alert("something went wrong!");
          }
        });
      });
    });

    //   $(".cartBtn").on("click", () => {
    //     //call event in brackets.
    //     //const id = $(this).data("id");
    //     fetch(`/api/storefront/${id}`, {
    //       method: "PUT",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //       }.then(() => {
    //         console.log("added to cart"); /// Success response
    //         location.reload();
    //       }),
    //     });
    //   });

    //   $(".cartBtn").on("click", function() {
    //     //call event in brackets.
    //     const id = $(this).data("id");
    //     $.ajax("/api/cart" + id);
    //     $.ajax({
    //       type: "POST",
    //       url: url, //appropriate url.... apicart/id
    //       data: productId
    //     }).then(() => {
    //       console.log("added to cart"); /// Success response
    //       location.reload();
    //     });
    //   });
  }
});
