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
    client_type: {
      type: DataTypes.ENUM,
      values: ["customer", "business-owner"],
      allowNull: false,
      defaultValue: "customer"
    }
  });

  Customer.associate = models => {
    Customer.hasMany(models.Orders, {});
  };

  return Customer;
};
