document.addEventListener("DOMContentLoaded", event => {
  if (event) {
    console.info("DOM loaded");
  }

  //call event in brackets.
  const id = $(this).data("id");
  fetch(`/api/storefront/${id}`, {
    method: "GET",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }.then(() => {
      this.data, console.log("loaded"); /// Success response
      location.reload();
    })
  });

  $(".cartBtn").on("click", function() {
    //call event in brackets.
    const id = $(this).data("id");
    fetch(`/api/storefront/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }.then(() => {
        console.log("added to cart"); /// Success response
        location.reload();
      })
    });
  });

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

  //   const addToCartButton = document.querySelectorAll(".devoured");

  // Set up the event listener for the create button
  //   if (devourBtn) {
  //     devourBtn.forEach((button) => {
  //       button.addEventListener("click", (e) => {
  //         // Grabs the id of the element that goes by the name, "id"
  //         const id = e.target.getAttribute("data-id");
  //         const newDevour = e.target.getAttribute("data-newdevour");

  //         const newDevourState = {
  //           devoured: newDevour,
  //           devoured: true,
  //         };
  //         // devoured true. So anything that has new devour, change to current devour.
  //         fetch(`/api/burgers/${id}`, {
  //           method: "PUT",
  //           headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //           },

  //           // make sure to serialize the JSON body
  //           body: JSON.stringify(newDevourState),
  //         }).then((response) => {
  //           // Check that the response is all good
  //           // Reload the page so the user can see the new quote
  //           if (response.ok) {
  //             console.log(`changed devoured to: ${newDevour}`);
  //             location.reload("/");
  //           } else {
  //             alert("something went wrong!");
  //           }
  //         });
  //       });

  //getting if of product

  // fetch(`/api/cats/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },

  // router.get('/', (req, res) => {
  //     cat.all((data) => {
  //       const hbsObject = {
  //         cats: data,
  //       };
  //       console.log('hbsObject', hbsObject);
  //       res.render('index', hbsObject);
  //     });
  //   });

  // CREATE
  // const createSubmitBtn = document.getElementById("storeFrontSubmit");

  // if (createSubmitBtn) {
  //   createSubmitBtn.addEventListener("submit", (e) => {
  //     e.preventDefault();

  //     // Grabs the value of the textarea that goes by the name, "quote"
  //     const newBurger = {
  //       burger_name: document.getElementById("burg").value.trim(),
  //       devoured: false,
  //     };

  // Send POST request to create a new quote
  //     fetch("/api/burgers", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },

  //       // make sure to serialize the JSON body
  //       body: JSON.stringify(newBurger),
  //     }).then(() => {
  //       // Empty the form
  //       document.getElementById("burg").value = "";

  //       // Reload the page so the user can see the new quote
  //       console.log("Created a new burger!");
  //       location.reload();
  //     });
  //   });
});
