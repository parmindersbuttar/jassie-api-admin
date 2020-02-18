const Sequelize = require('sequelize');
const bcryptService = require('../services/bcrypt.service');

const sequelize = require('../../config/database');

// const hooks = {
//   beforeCreate(user) {
//     user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
//   },
// };

const tableName = 'category';

const Category = sequelize.define('Category', {
    name: {
      type: Sequelize.STRING,
      unique: true,
      required: true,
    },
    description: {
      type: Sequelize.TEXT,
    }
  }, { tableName });

  Category.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());  
    return values;
  };

  module.exports = Category;
  