const { validationResult } = require('express-validator');
const VideoCategory = require('../models/VideoCategory');

const VideoCategoryController = () => {
    const register = async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const { body } = req;
      try {
        const video_category = await VideoCategory.create({
          VideoId : body.video_id,
          CategoryId : body.category_id,
        });

        return res.status(200).json({ video_category });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }  
    };
  
    return {
      register
    };
  };
  
  module.exports = VideoCategoryController;
  