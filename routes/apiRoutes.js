var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.customer.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.customer.create(req.body).then(function(dbExample) {
      res.json(dbExample);
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

 

  // Delete an example by id
  app.delete("/api/examples/:cust_id", function(req, res) {
    db.customer.destroy({ where: { cust_id: req.params.cust_id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};

