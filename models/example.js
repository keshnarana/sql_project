//making a table called customer in db
module.exports = function(sequelize, DataTypes) {
  var customer = sequelize.define("customer", {
    id: {
      type: DataTypes.INTEGER,
      autoIncremet: true,
      primaryKey: true,
    },
    cust_name: {
      type: DataTypes.STRING,
    },
    cust_addr1: {
      type: DataTypes.STRING,
    },
    cust_addr2: {
      type: DataTypes.STRING,
    },
    cust_zip: {
      type: DataTypes.STRING,
    },
    cust_phone: {
      type: DataTypes.STRING,
    },
    cust_type: {
      type: DataTypes.INTEGER,
    },
    cust_username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    cust_yelpID: {
      type: DataTypes.STRING,
    }

  });
  customer.associate = function(models) {
    // We're saying that a customer should belong to an Author
    // A customer can't be created without an Author due to the foreign key constraint
    customer.hasMany(models.cust_order, {
      foreignKey: {
      
          name:   'id',
        allowNull: false
      },
      constraints: false,
      onDelete: "cascade",
      
    });
  };
  return customer;
};
