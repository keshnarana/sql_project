module.exports = function(sequelize, DataTypes) {
    var products = sequelize.define("products", {
        item_id:{
            type: DataTypes.INTEGER,
            autoIncremet:true,
            primaryKey: true,
           },
           upc_code: {
              type:DataTypes.INTEGER,
            },
            product_name: {
              type:DataTypes.STRING,
            },
            stock_quantity: {
              type:DataTypes.INTEGER,
            },
            wholsale_cost: {
              type:DataTypes.INTEGER,
            },
            retail_price: {
                type: DataTypes.INTEGER,
              }
            })
            return products;
          };