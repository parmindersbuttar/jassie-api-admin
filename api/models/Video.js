const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'video';

const Video = sequelize.define('Video', {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    filename:{
        type: Sequelize.STRING
    }
  }, { tableName });

  Video.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());  
    return values;
  };

  module.exports = Video;
  