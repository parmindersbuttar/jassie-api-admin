const { validationResult } = require('express-validator');
const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const Video = require('../models/Video');
const VideoCategory = require('../models/VideoCategory');

// const Category = require('../models/Category');

const VideoController = () => {
    const register = async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      var { name, description, filename, category_ids } = req.body;
      try {
        filename = JSON.parse(filename)
        console.log(filename)
        // const video = await Video.create({
        //   name: name,
        //   description : description,
        //   filename: filename,
        // });

        // const categoryData = category_ids.map(id => {
        //     return {
        //         CategoryId: id,
        //         VideoId: video.id
        //     }
        // }) 

        // const videoCategories = await VideoCategory.bulkCreate(categoryData);

        // return res.status(200).json({ video, videoCategories });
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

      const uploadFile = (filename) => {
        fs.readFile(fileName, (err, data) => {
           if (err) throw err;
           const params = {
               Bucket: 'testBucket', // pass your bucket name
               Key: 'contacts.csv', // file will be saved as testBucket/contacts.csv
               Body: JSON.stringify(data, null, 2)
           };
           s3.upload(params, function(s3Err, data) {
               if (s3Err) throw s3Err
               console.log(`File uploaded successfully at ${data.Location}`)
           });
        });
      };
  
    return {
      register,
      getAll
    };
  };
  
  module.exports = VideoController;
  