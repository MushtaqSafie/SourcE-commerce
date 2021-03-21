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

const products = [
  {
    product_name: "Nike",
    product_description: "Description of the product",
    inventory: 100,
    purchase_price: 19.99,
    selling_price: 75.0,
    product_url: "/img/1.JPG"
  },
  {
    product_name: "Adidas",
    product_description: "Description of the product",
    inventory: 100,
    purchase_price: 29.18,
    selling_price: 49.99,
    product_url: "/img/2.JPG"
  },
  {
    product_name: "Puma",
    product_description: "Description of the product",
    inventory: 100,
    purchase_price: 24.54,
    selling_price: 56.6,
    product_url: "/img/3.JPG"
  },
  {
    product_name: "Oasics",
    product_description: "Description of the product",
    inventory: 100,
    purchase_price: 29.9,
    selling_price: 85.0,
    product_url: "/img/4.JPG"
  }
];

const orders = [
  {
    createdAt: "2021-03-19T03:58:54.000Z",
    quantity: 1,
    order_status: "cart-item",
    CustomerId: 1,
    ProductId: 2
  },
  {
    createdAt: "2021-03-18T03:58:54.000Z",
    quantity: 1,
    order_status: "confirmed-order",
    CustomerId: 2,
    ProductId: 4
  },
  {
    createdAt: "2021-03-17T03:58:54.000Z",
    quantity: 1,
    order_status: "cart-item",
    CustomerId: 1,
    ProductId: 2
  },
  {
    createdAt: "2021-03-18T03:58:54.000Z",
    quantity: 1,
    order_status: "confirmed-order",
    CustomerId: 1,
    ProductId: 3
  },
  {
    createdAt: "2021-03-15T03:58:54.000Z",
    quantity: 1,
    order_status: "confirmed-order",
    CustomerId: 1,
    ProductId: 2
  },
  {
    createdAt: "2021-03-18T03:58:54.000Z",
    quantity: 1,
    order_status: "cart-item",
    CustomerId: 1,
    ProductId: 4
  },
  {
    createdAt: "2021-03-18T03:58:54.000Z",
    quantity: 1,
    order_status: "confirmed-order",
    CustomerId: 2,
    ProductId: 3
  },
  {
    createdAt: "2021-03-17T03:58:54.000Z",
    quantity: 1,
    order_status: "cart-item",
    CustomerId: 1,
    ProductId: 2
  },
  {
    createdAt: "2021-03-20T03:58:54.000Z",
    quantity: 1,
    order_status: "confirmed-order",
    CustomerId: 2,
    ProductId: 4
  },
  {
    createdAt: "2021-03-14T03:58:54.000Z",
    quantity: 1,
    order_status: "cart-item",
    CustomerId: 1,
    ProductId: 2
  },
  {
    createdAt: "2021-03-13T03:58:54.000Z",
    quantity: 1,
    order_status: "confirmed-order",
    CustomerId: 1,
    ProductId: 3
  },
  {
    createdAt: "2021-03-18T03:58:54.000Z",
    quantity: 1,
    order_status: "cart-item",
    CustomerId: 1,
    ProductId: 2
  },
  {
    createdAt: "2021-03-18T03:58:54.000Z",
    quantity: 1,
    order_status: "cart-item",
    CustomerId: 1,
    ProductId: 4
  },
  {
    createdAt: "2021-03-18T03:58:54.000Z",
    quantity: 1,
    order_status: "confirmed-order",
    CustomerId: 2,
    ProductId: 3
  },
  {
    createdAt: "2021-03-20T03:58:54.000Z",
    quantity: 1,
    order_status: "cart-item",
    CustomerId: 1,
    ProductId: 2
  },
  {
    createdAt: "2021-03-19T03:58:54.000Z",
    quantity: 1,
    order_status: "confirmed-order",
    CustomerId: 2,
    ProductId: 4
  },
  {
    createdAt: "2021-03-14T03:58:54.000Z",
    quantity: 1,
    order_status: "cart-item",
    CustomerId: 1,
    ProductId: 2
  },
  {
    createdAt: "2021-03-13T03:58:54.000Z",
    quantity: 1,
    order_status: "confirmed-order",
    CustomerId: 1,
    ProductId: 3
  },
  {
    createdAt: "2021-03-12T03:58:54.000Z",
    quantity: 1,
    order_status: "confirmed-order",
    CustomerId: 1,
    ProductId: 2
  },
  {
    createdAt: "2021-03-11T03:58:54.000Z",
    quantity: 1,
    order_status: "cart-item",
    CustomerId: 1,
    ProductId: 4
  },
  {
    createdAt: "2021-03-10T03:58:54.000Z",
    quantity: 1,
    order_status: "confirmed-order",
    CustomerId: 2,
    ProductId: 3
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
