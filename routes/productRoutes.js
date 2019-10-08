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
    });
  });

//   router.put("/api/burgers/:id", function(req, res) {
//     var condition = "id = " + req.params.id;

//     console.log("condition", condition);

//     burger.updateOne({ devoured: req.body.devoured }, condition, function(result) {
//         if (result.changedRows === 0) {
//             // If no rows were changed, then the ID must not exist, so 404.
//             return res.status(404).end();
//         } else {
//             res.status(200).end();
//         }
//     });
// });

  // //update
  // app.put("/api/products/:email", function(req, res) {
  //   db.Products.update(
    // message: req.body.message
  //     {

  //       where: {
  //         email: req.body.email
  //       }
  //     })
  //     .then(function(dbProducts) {
  //       res.json(dbProducts);
  //     });
  // });
  

  // Delete an example by id
  app.delete("/api/products/:id", function(req, res) {
    db.products.destroy({ where: { id: req.params.id } }).then(function(dbProducts) {
      res.json(dbProducts);
    });
  });
};

