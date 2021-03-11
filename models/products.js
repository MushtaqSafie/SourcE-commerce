module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("Products", {
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    product_description: {
      type: DataTypes.TEXT
    },
    inventory: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    purchase_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    selling_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    product_image: {
      type: DataTypes.BLOB("long")
    }
  });

  Products.associate = (models) => {
    Products.hasMany(models.Orders, {});
  };

  return Products;
};
