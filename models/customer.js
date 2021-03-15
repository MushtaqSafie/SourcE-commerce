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
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    zip_code: {
      type: DataTypes.INTEGER
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // option [buyer , buyer/seller]
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
