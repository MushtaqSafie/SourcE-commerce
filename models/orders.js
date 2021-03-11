module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define("Orders", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    order_status: {
      type: DataTypes.ENUM,
      values: ["cart-item", "confirmed-order"],
      allowNull: false
    }
  });

  Orders.associate = (models) => {
    Orders.belongsTo(models.Products, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  Orders.associate = (models) => {
    Orders.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Orders;
};
