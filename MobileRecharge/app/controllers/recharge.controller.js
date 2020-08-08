const Recharge = require("../models/recharge.model.js");


// Find a single Customer with a mobile number
exports.findOne = (req, res) => {
  Recharge.findById(req.params.mobileNo, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.mobileNo}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.mobileNo
        });
      }
    } else res.send(data);
  });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Recharge.updateById(
    req.params.mobileNo,
    new Recharge(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.mobileNo}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.mobileNo
          });
        }
      } else res.send(data);
    }
  );
};
