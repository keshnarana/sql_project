//making a table called Example in db
module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Example;
};

module.exports = function(sequelize, DataTypes) {
var Customer = sequelize.define("Customer", {
id:{
  type: DataTypes.INTEGER,
  autoIncremet:true,
  primaryKey: true,
},
  name: {
    type:DataTypes.STRING,
  allowNull:false},

 email  : DataTypes.TEXT
});
return Customer;
};