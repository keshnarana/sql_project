module.exports = function(sequelize, DataTypes) {
    var products = sequelize.define("products", {
        item_id:{
            type: DataTypes.INTEGER,

           },
           upc_code: {
              type:DataTypes.INTEGER,
              primaryKey: true,
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
            });
          
            products.associate = function(models) {
              // We're saying that a products should belong to an Author
              // A products can't be created without an Author due to the foreign key constraint
              products.hasMany(models.cust_order, {
                foreignKey: {
                
                    name:   'upc_code',
                  allowNull: false
                },
                constraints: false,
                onDelete: "cascade",
                
              });
            };
            return products;
          };

        
