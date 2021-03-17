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
    },
    purchase_price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    selling_price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    product_image: {
      type: DataTypes.BLOB("long")
    },
    product_url: {
      type: DataTypes.STRING
    }
  });

  Products.associate = models => {
    Products.hasMany(models.Orders, {});
  };

  return Products;
};
