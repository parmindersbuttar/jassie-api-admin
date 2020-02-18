const { validationResult } = require('express-validator');
const Video = require('../models/Video');
const VideoCategory = require('../models/VideoCategory');
// const Category = require('../models/Category');

const VideoController = () => {
    const register = async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const { name, description, filename, category_ids } = req.body;
      try {
        const video = await Video.create({
          name: name,
          description : description,
          filename: filename,
        });

        const categoryData = category_ids.map(id => {
            return {
                CategoryId: id,
                VideoId: video.id
            }
        }) 

        const videoCategories = await VideoCategory.bulkCreate(categoryData);

        return res.status(200).json({ video, videoCategories });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }  
    };

    const getAll = async (req, res) => {
        try {
          const video = await Video.findAll({
            order:[
              ['updatedAt', 'DESC']
            ]
          });
    
          return res.status(200).json({ video });
        } catch (err) {
          console.log(err);
          return res.status(500).json({ msg: 'Internal server error' });
        }
      };
  
    return {
      register,
      getAll
    };
  };
  
  module.exports = VideoController;
  