module.exports = app => {
  const recharge = require("../controllers/recharge.controller.js");

  // Retrieve a single Customer with customerId
  app.get("/recharge/:mobileNo", recharge.findOne);

  // Update a Customer with customerId
  app.put("/recharge/:mobileNo", recharge.update);

};
