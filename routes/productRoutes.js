var db = require("../models");

module.exports = function(app) {
  // Get all products
  app.get("/api/products", function(req, res) {
    db.products.findAll({}).then(function(dbproducts) {
      res.json(dbproducts);
    });
  });

  // Create a new Products
  app.post("/api/products", function(req, res) {
    db.products.create(req.body).then(function(dbProducts) {
      res.json(dbProducts);
      if (dbProducts.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404.
        return res.status(404).end();
    } else {
        res.status(200).end();
    }
    });
  });



  //update
  app.post("/api/products/:upc_code", function(req, res) {
    db.products.update(
     { upc_code: req.body.upc_code,
      product_name:req.body.product_name,
      stock_quantity:req.body.stock_quantity,
      wholsale_cost:req.body.wholsale_cost},
      {
         where: {
          upc_code: req.params.upc_code
        }
      })
      .then(function(dbProducts) {
        res.json(dbProducts);
        if (dbProducts.changedRows === 0) {
                      // If no rows were changed, then the ID must not exist, so 404.
                      return res.status(404).end();
                  } else {
                      res.status(200).end();
                  }
        
      });
  });
  

  // Delete an example by id
  app.delete("/api/products/:item_id", function(req, res) {
    db.products.destroy({ where: { item_id: req.params.item_id } }).then(function(dbProducts) {
      res.json(dbProducts);
    });
  });
};

