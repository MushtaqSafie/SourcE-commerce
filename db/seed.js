const fs = require("fs");
const db = require("../models");

const customers = [
  {
    first_name: "mushtaq",
    last_name: "safie",
    city: "Sydney",
    state: "NSW",
    zip_code: 2000,
    email: "mushtaq@example.com",
    user_password: "myPassword",
    client_type: "business-owner"
  },
  {
    first_name: "Fatima",
    last_name: "Fakih",
    city: "Sydney",
    state: "NSW",
    zip_code: 2000,
    email: "fatima@example.com",
    user_password: "myPassword",
    client_type: "business-owner"
  },
  {
    first_name: "Fraser",
    last_name: "Clarke",
    city: "Sydney",
    state: "NSW",
    zip_code: 2000,
    email: "Fraser@example.com",
    user_password: "myPassword",
    client_type: "business-owner"
  },
  {
    first_name: "Jessie",
    last_name: "Ng",
    city: "Sydney",
    state: "NSW",
    zip_code: 2000,
    email: "Jessie@example.com",
    user_password: "myPassword",
    client_type: "business-owner"
  }
];

const orders = [
  {
    quantity: 1,
    order_status: "cart-item",
    CustomerId: 1,
    ProductId: 1
  },
  {
    quantity: 1,
    order_status: "cart-item",
    CustomerId: 2,
    ProductId: 2
  },
  {
    quantity: 1,
    order_status: "cart-item",
    CustomerId: 3,
    ProductId: 3
  },
  {
    quantity: 1,
    order_status: "cart-item",
    CustomerId: 4,
    ProductId: 4
  }
];

function readImageFile(file) {
  // read binary data from a file:
  const bitmap = fs.readFileSync(file);
  const result = new Buffer(bitmap);
  return result;
}

const products = [
  {
    product_name: "PUMA Women's Carina Sneaker",
    product_description: "Description of the product",
    inventory: 100,
    purchase_price: 15.22,
    selling_price: 49.99,
    product_image: readImageFile("../public/img/1.JPG"),
    product_url: "/img/1.JPG"
  },
  {
    product_name: "adidas Men's X9000l2 Trail Running Shoe",
    product_description: "Description of the product",
    inventory: 100,
    purchase_price: 15.22,
    selling_price: 49.99,
    product_image: readImageFile("../public/img/2.JPG"),
    product_url: "/img/2.JPG"
  },
  {
    product_name: "adidas Women's Questar Flow Running Shoe",
    product_description: "Description of the product",
    inventory: 100,
    purchase_price: 15.22,
    selling_price: 49.99,
    product_image: readImageFile("../public/img/3.JPG"),
    product_url: "/img/3.JPG"
  },
  {
    product_name: "adidas Women's Questar Flow Shoe",
    product_description: "Description of the product",
    inventory: 100,
    purchase_price: 15.22,
    selling_price: 49.99,
    product_image: readImageFile("../public/img/4.JPG"),
    product_url: "/img/4.JPG"
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
