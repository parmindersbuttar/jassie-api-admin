const Token = require("../models/Token");

const TokenController = () => {
  const create = async (req, res) => {
    const { body } = req;
    try {
      const createdToken = await Token.create({
        amount: body.amount,
        count: body.count
      });

      return res.status(200).json({
        success: true,
        msg: "Token has been created successfully",
        token: createdToken
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ success: false, msg: "Internal server error" });
    }
  };
  const getAll = async (req, res) => {
    try {
      const tokens = await Token.findAll();
      return res.status(200).json({ success: true, data: tokens });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ success: false, msg: "Internal server error" });
    }
  };
  return {
    create,
    getAll
  };
};

module.exports = TokenController;
