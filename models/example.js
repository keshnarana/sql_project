//making a table called customer in db
module.exports = function(sequelize, DataTypes) {
  var customer = sequelize.define("customer", {
    cust_id:{
      type: DataTypes.INTEGER,
      autoIncremet:true,
      primaryKey: true,
     },
     cust_name: {
        type:DataTypes.STRING,
      },
      cust_addr1: {
        type:DataTypes.STRING,
      },
      cust_addr2: {
        type:DataTypes.STRING,
      },
      cust_zip: {
        type: DataTypes.INTEGER,
      },
      cust_phone: {
        type: DataTypes.STRING,
      },
      cust_passwd: {
        type: DataTypes.INTEGER,
      },
      cust_email: {
        type:DataTypes.TEXT
      },
      cust_yelpID: {
        type:DataTypes.STRING,
     },
     quantity:{
      type: DataTypes.INTEGER,
     },
    createdAt:{
      type:DataTypes.INTEGER,
    },
    updatedAt:{
      type: DataTypes.INTEGER,
    }

  });
  customer.associate = function(models) {
    // We're saying that a customer should belong to an Author
    // A customer can't be created without an Author due to the foreign key constraint
    customer.hasMany(models.cust_order, {
      foreignKey: {
      
          name:   'cust_id',
        allowNull: false
      },
      constraints: false,
      onDelete: "cascade",
      
    });
  };
  return customer;
};

