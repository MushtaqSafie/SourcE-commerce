USE SourcEcommerce;

INSERT INTO customers (first_name, last_name, email, user_password, client_type, createdAt, updatedAt)
VALUES 
    ("helo",
    "me",
    "helo@me",
    "XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=",
    "customer",
    "2020-01-01 10:10:10-08:00",
    "2021-02-14 23:59:59+05:30");

INSERT INTO products (product_name, product_description, inventory, purchase_price, selling_price, product_url, createdAt, updatedAt)
VALUES
    ("First product",
    "Description of the product",
    100,
    15.22,
    49.99,
    "/img/1.JPG",
    "2020-01-01 10:10:10-08:00",
    "2021-02-14 23:59:59+05:30");

INSERT INTO orders (quantity, order_status, createdAt, updatedAt, CustomerId, ProductId)
VALUES
    (1,
    "cart-item",
    "2020-01-01 10:10:10-08:00",
     "2021-02-14 23:59:59+05:30",
    1,
    2);

SELECT * FROM customers;
SELECT * FROM orders;
SELECT * FROM products;