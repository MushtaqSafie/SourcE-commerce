CREATE TABLE Customers (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  first_name VARCHAR(500),
  last_name VARCHAR(500) ,
  email VARCHAR(500),
  user_password VARCHAR(500),
  business_name VARCHAR(500),
  phone_number INT,
  client_type ENUM("customer", "business-owmer")
);

CREATE TABLE Orders (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  quantity INT,
  client_type ENUM("cart-item", "confirmed-order")
);

CREATE TABLE Products (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  product_name VARCHAR(500),
  product_description VARCHAR(500) ,
  inventory INT,
  purchase_price DECIMAL(10, 2) NULL,
  selling_price DECIMAL(10, 2) NULL,
  client_type BLOB,
  product_url VARCHAR(500)  
);