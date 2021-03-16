module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("Customer", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.INTEGER(10)
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // change to client-type & values = "customer", "business-owner"?
    customer_status: {
      type: DataTypes.ENUM,
      values: ["buyer", "buyer/seller"],
      allowNull: false
    }
  });

  Customer.associate = models => {
    Customer.hasMany(models.Orders, {});
  };

  return Customer;
};
