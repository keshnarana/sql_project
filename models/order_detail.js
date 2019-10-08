//making a table called cust_order in db
module.exports = function(sequelize, DataTypes) {
    var cust_order = sequelize.define("cust_order", {
      id:{
        type: DataTypes.INTEGER,
        autoIncremet:true,
        primaryKey: true,
       },
       quantity:{
        type: DataTypes.INTEGER,
       },
      createdAt:{
        type:DataTypes.INTEGER,
      },
      updatedAt:{
        type: DataTypes.INTEGER,
      },
      
  
    });

  
    
  

     
    return cust_order;
  };
  
  