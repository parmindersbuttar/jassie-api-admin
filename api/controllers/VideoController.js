const { validationResult } = require("express-validator");
const fs = require("fs");
const Video = require("../models/Video");
const VideoCategory = require("../models/VideoCategory");

const AWS = require("aws-sdk");
const Busboy = require("busboy");
const BUCKET_NAME = "jessie-api";
const IAM_USER_KEY = "AKIAR5ADLPNGJLIE7CHE";
const IAM_USER_SECRET = "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";

let s3bucket = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET,
  Bucket: BUCKET_NAME
});
// const Category = require('../models/Category');

const VideoController = () => {
  const register = async (req, res) => {
    // var busboy = new Busboy({ headers: req.headers });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    var { name, description, category_ids } = req.body;
    try {
      var datetime = new Date();
      var datetimeFolder = datetime.toISOString().slice(0, 10);
      var userId = "1";
      const file = req.files.filename;
      const filenamedyn =
        datetimeFolder + "/" + userId + "/" + Date.now() + "_" + file.name;

      var params = { Bucket: BUCKET_NAME, Key: filenamedyn, Body: file.data };
      s3bucket.upload(params, async function(err, data) {
        if (err) return res.status(200).json({ err });
        else {
          const video = await Video.create({
            name: name,
            description: description,
            filename: data.Location
          });

          var string = category_ids;
          var category_ids_obj = JSON.parse("[" + string + "]");
          const categoryData = category_ids_obj.map(id => {
            return {
              CategoryId: id,
              VideoId: video.id
            };
          });

          const videoCategories = await VideoCategory.bulkCreate(categoryData);

          return res.status(200).json({ video, videoCategories });
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const getAll = async (req, res) => {
    try {
      const video = await Video.findAll({
        order: [["updatedAt", "DESC"]]
      });

      return res.status(200).json({ video });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const uploadFile = filename => {
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      const params = {
        Bucket: "testBucket", // pass your bucket name
        Key: "contacts.csv", // file will be saved as testBucket/contacts.csv
        Body: JSON.stringify(data, null, 2)
      };
      s3.upload(params, function(s3Err, data) {
        if (s3Err) throw s3Err;
        console.log(`File uploaded successfully at ${data.Location}`);
      });
    });
  };

  return {
    register,
    getAll
  };
};

module.exports = VideoController;
