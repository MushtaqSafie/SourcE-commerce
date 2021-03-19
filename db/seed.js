// const fs = require("fs");
const db = require("../models");

const customers = [
  {
    first_name: "Mushtaq",
    last_name: "Safie",
    email: "mushtaq@SourcE.com",
    user_password: "XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=",
    client_type: "business-owner"
  },
  {
    first_name: "Fatima",
    last_name: "Fakih",
    email: "fatima@SourcE.com",
    user_password: "XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=",
    client_type: "business-owner"
  },
  {
    first_name: "Fraser",
    last_name: "Clarke",
    email: "Fraser@SourcE.com",
    user_password: "XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=",
    client_type: "business-owner"
  },
  {
    first_name: "Jessie",
    last_name: "Ng",
    email: "Jessie@SourcE.com",
    user_password: "XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=",
    client_type: "business-owner"
  },
  {
    first_name: "helo",
    last_name: "me",
    email: "helo@me",
    user_password: "XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=",
    client_type: "customer"
  }
];

// const file = fs.readFile("../media/img/product.JPG", result => {
//   return result;
// });

// console.log(file);

// const products = [
//   {
//     product_name: "First product",
//     product_description: "Description of the product",
//     inventory: 100,
//     purchase_price: 15.22,
//     selling_price: 49.99
//   },
//   {
//     product_name: "Second product",
//     product_description: "Description of the product",
//     inventory: 100,
//     purchase_price: 15.22,
//     selling_price: 49.99
//   },
//   {
//     product_name: "Third product",
//     product_description: "Description of the product",
//     inventory: 100,
//     purchase_price: 15.22,
//     selling_price: 49.99
//   }
// ];

// const orders = [
//   {
//     quantity: 1,
//     order_status: "cart-item",
//     CustomerId: 1,
//     ProductId: 1
//   }
// ];

customers.forEach(currentItem => {
  db.Customer.create(currentItem).then(result => console.log(result));
});

// products.forEach(currentItem => {
//   db.Products.create(currentItem).then(result => console.log(result));
// });

// orders.forEach(currentItem => {
//   db.Orders.create(currentItem).then(result => console.log(result));
// });
