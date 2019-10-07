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
    createdAt:{
      type:DataTypes.INTEGER,
    },
    updatedAt:{
      type: DataTypes.INTEGER,
    }

  })
  return customer;
};
