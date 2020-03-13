const { validationResult } = require("express-validator");
const fs = require("fs");
const Video = require("../models/Video");
const VideoCategory = require("../models/VideoCategory");
const AWS = require("aws-sdk");
const BUCKET_NAME = "jessie-api";
const IAM_USER_KEY = "AKIAR5ADLPNGJLIE7CHE";
const IAM_USER_SECRET = "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";

const s3bucket = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET,
  Bucket: BUCKET_NAME
});

const VideoController = () => {
  const register = async (req, res) => {
    const { id } = req.token;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    var { name, description, category_ids } = req.body;
    try {
      var userId = id;
      const { filename, thumbnailUrl } = req.files;

      if (!filename || !thumbnailUrl || !name || name === "") {
        return res.status(400).json({ msg: "Bad Request" });
      }

      await uploadFileToS3(filename, userId, async (err, videoRes) => {
        let videoResUrl = "";
        let imageResUrl = "";

        if (err) {
          return res
            .status(500)
            .json({ msg: "Internal server error", error: err });
        }

        videoResUrl = videoRes.Location;
        await uploadFileToS3(thumbnailUrl, userId, async (error, imageRes) => {
          if (error) {
            return res
              .status(500)
              .json({ msg: "Internal server error", error: error });
          }

          imageResUrl = imageRes.Location;

          const video = await Video.create({
            name: name,
            description: description,
            filename: videoResUrl,
            thumbnailUrl: imageResUrl
          });

          var categories = category_ids;
          var videoCategories = [];
          var category_ids_obj = JSON.parse("[" + categories + "]");

          const categoryData = category_ids_obj.map(id => {
            return {
              CategoryId: id,
              VideoId: video.id
            };
          });

          if (categoryData.length)
            videoCategories = await VideoCategory.bulkCreate(categoryData);

          return res
            .status(200)
            .json({ video, videoCategories: videoCategories });
        });
      });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error", error: err });
    }
  };

  const uploadFileToS3 = async (file, userId, cb) => {
    var datetime = new Date();
    var datetimeFolder = datetime.toISOString().slice(0, 10);
    const filenamedyn = `${datetimeFolder}/${userId}/${Date.now()}_${
      file.name
    }`;

    const params = {
      Bucket: BUCKET_NAME,
      Key: filenamedyn,
      Body: file.data
    };

    return await s3bucket.upload(params, cb);
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
