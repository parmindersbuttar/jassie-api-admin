const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

const hooks = {};

const tableName = "tokens";

const Token = sequelize.define(
  "Token",
  {
    amount: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    count: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  { hooks, tableName }
);

module.exports = Token;
