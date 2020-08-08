const sql = require("./db.js");


const Recharge = function(recharge) {
  this.mobileNo = recharge.mobileNo;
  this.name = recharge.name;
  this.avlB = recharge.avlB;
  this.rechargeAmt = recharge.rechargeAmt;
};


Recharge.findById = (mobileNo, result) => {
  sql.query(`SELECT * FROM recharge WHERE mobileNo = ${mobileNo}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found account with the mobile no
    result({ kind: "not_found" }, null);
  });
};


Recharge.updateById = (mobileNo, recharge, result) => {
  sql.query(
    "UPDATE recharge SET name = ?, rechargeAmt = ?, avlB = (? + rechargeAmt) WHERE mobileNo = ?",
    [recharge.name, recharge.rechargeAmt, recharge.avlB, mobileNo],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Account with the mobile number
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated recharge: ", { mobileNo: mobileNo, ...recharge });
      result(null, { mobileNo: mobileNo, ...recharge });
    }
  );
};


module.exports = Recharge;
