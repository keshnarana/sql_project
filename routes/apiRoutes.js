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

  // //update
  // app.put("/api/examples/:email", function(req, res) {
  //   db.Example.update(
    // message: req.body.message
  //     {

  //       where: {
  //         email: req.body.email
  //       }
  //     })
  //     .then(function(dbExample) {
  //       res.json(dbExample);
  //     });
  // });
  

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.customer.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};

