const Sequelize = require("sequelize");
const bcryptService = require("../services/bcrypt.service");

const sequelize = require("../../config/database");

const hooks = {
  beforeCreate(user) {
    user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
  }
};

const tableName = "users";

const User = sequelize.define(
  "User",
  {
    email: {
      type: Sequelize.STRING,
      unique: true,
      required: true
    },
    password: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    stripeCustomerId: {
      type: Sequelize.STRING
    },
    tokenCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  },
  { hooks, tableName }
);

// eslint-disable-next-line
User.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());

  delete values.password;
  delete values.stripeCustomerId;

  return values;
};

module.exports = User;
