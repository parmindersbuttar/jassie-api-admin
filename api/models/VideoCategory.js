const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const Video     = require('./Video');
const Category  = require('./Category');

const tableName = 'video_category';

const VideoCategory = sequelize.define('VideoCategory', {
    id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
  }, { tableName });

  Video.belongsToMany(Category, { through: VideoCategory } );
  Category.belongsToMany(Video, { through: VideoCategory } );

  VideoCategory.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());  
    return values;
  };

  module.exports = VideoCategory;