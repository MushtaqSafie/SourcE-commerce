const fs = require("fs");
const db = require("../models");

db.Customer.findAll({}).then(result => console.log(result));

const customers = [
  {
    first_name: "mushtaq",
    last_name: "safie",
    city: "Sydney",
    state: "NSW",
    zip_code: 2000,
    email: "mushtaq@example.com",
    user_password: "myPassword",
    customer_status: "buyer/seller"
  },
  {
    first_name: "Fatima",
    last_name: "Fakih",
    city: "Sydney",
    state: "NSW",
    zip_code: 2000,
    email: "fatima@example.com",
    user_password: "myPassword",
    customer_status: "buyer/seller"
  },
  {
    first_name: "Fraser",
    last_name: "Clarke",
    city: "Sydney",
    state: "NSW",
    zip_code: 2000,
    email: "Fraser@example.com",
    user_password: "myPassword",
    customer_status: "buyer/seller"
  },
  {
    first_name: "Jessie",
    last_name: "Ng",
    city: "Sydney",
    state: "NSW",
    zip_code: 2000,
    email: "Jessie@example.com",
    user_password: "myPassword",
    customer_status: "buyer/seller"
  }
];

const file = fs.readFile("../media/img/product.JPG", result => {
  return result;
});

console.log(file);

const products = [
  {
    product_name: "First product",
    product_description: "Description of the product",
    inventory: 100,
    purchase_price: 15.22,
    selling_price: 49.99
  },
  {
    product_name: "Second product",
    product_description: "Description of the product",
    inventory: 100,
    purchase_price: 15.22,
    selling_price: 49.99
  },
  {
    product_name: "Third product",
    product_description: "Description of the product",
    inventory: 100,
    purchase_price: 15.22,
    selling_price: 49.99
  }
];

const orders = [
  {
    quantity: 1,
    order_status: "cart-item",
    CustomerId: 1,
    ProductId: 1
  }
];

customers.forEach(currentItem => {
  db.Customer.create(currentItem).then(result => console.log(result));
});

products.forEach(currentItem => {
  db.Products.create(currentItem).then(result => console.log(result));
});

orders.forEach(currentItem => {
  db.Orders.create(currentItem).then(result => console.log(result));
});
