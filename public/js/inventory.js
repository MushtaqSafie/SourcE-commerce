document.addEventListener("DOMContentLoaded", event => {
  if (event) {
    console.info("DOM loaded");
  }

  // CREATE
  const createSubmitBtn = document.getElementById("create-form");

  if (createSubmitBtn) {
    createSubmitBtn.addEventListener("submit", e => {
      e.preventDefault();

      const img = document.getElementById("input-files").files[0];

      // // encode the file using the FileReader API
      const reader = new FileReader();
      reader.onloadend = () => {
        // use a regex to remove data url part
        reader.result;
      };
      reader.readAsBinaryString(img);
      console.log(img);


      const d = new Date();
      const yyyy = d.getFullYear();
      const mm = d.getMonth();
      const dd = d.getDate();
      const hh = d.getHours();
      const m = d.getMinutes();
      const s = d.getSeconds();
      const imgURLname = `/img/${yyyy}${mm}${dd}${hh}${m}${s}.JPG`;

      // Grabs the value of the textarea that goes by the name, "quote"
      const newProduct = {
        product_name: document.getElementById("product-name").value.trim(),
        product_description: document
          .getElementById("inventory-description")
          .value.trim(),
        inventory: document.getElementById("inventory-quantity").value.trim(),
        selling_price: document.getElementById("inventory-price").value.trim(),
        product_url: imgURLname,
        product_image: img,

      };

      // Send POST request to create a new quote
      fetch("/api/inventory", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },

        // make sure to serialize the JSON body
        body: JSON.stringify(newProduct)
      }).then(() => {
        // Empty the form

        document.getElementById("product-name").value = "";
        document.getElementById("inventory-description").value = "";
        document.getElementById("inventory-quantity").value = "";
        document.getElementById("inventory-price").value = "";
        document.getElementById("input-files").value = "";
        // Reload the page so the user can see the new quote
        console.log("Created a new Product");
        location.reload();
      });
    });
  }

  // const newProductBtn = document.querySelectorAll(".products");

  // // Set up the event listener for the create button
  // if (newProductBtn) {
  //   newProductBtn.forEach(button => {
  //     button.addEventListener("click", e => {
  //       // Grabs the id of the element that goes by the name, "id"
  //       const id = e.target.getAttribute("data-id");
  //       const newProduct = e.target.getAttribute("data-newProduct");

  //       const newProductState = {
  //         products: newProduct,
  //         products: true
  //       };
  //       // products true. So anything that has new product, change to current product.
  //       fetch(`/api/products/${id}`, {
  //         method: "PUT",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json"
  //         },

  //         // make sure to serialize the JSON body
  //         body: JSON.stringify(newProductState)
  //       }).then(response => {
  //         // Check that the response is all good
  //         // Reload the page so the user can see the new quote
  //         if (response.ok) {
  //           console.log(`changed products to: ${newProduct}`);
  //           location.reload("/");
  //         } else {
  //           alert("something went wrong!");
  //         }
  //       });
  //     });
  //   });
  // }
});
