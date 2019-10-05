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
      ust_addr1: {
        type:DataTypes.STRING,
      },
      ust_addr2: {
        type:DataTypes.STRING,
      },
      cust_zip: {
        type: DataTypes.INTEGER,
      },
      _cust_phone: {
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
     }})
  return customer;
};
