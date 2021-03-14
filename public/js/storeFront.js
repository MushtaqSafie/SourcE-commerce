$(".cartBtn").on("click", function() {
  //call event in brackets.
  const id = $(this).data("id");
  $.ajax("/api/cart" + id);
  $.ajax({
    type: "POST",
    url: url, //appropriate url.... apicart/id
    data: productId
  }).then(() => {
    console.log("added to cart"); /// Success response
    location.reload();
  });
});

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
