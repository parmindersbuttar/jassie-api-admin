const userValidator = require("../../api/validators/registerationValidator");

const publicRoutes = {
  "POST /user": "UserController.register",
  "POST /register": {
    path: "UserController.register",
    middlewares: [userValidator]
  },
  "POST /login": "UserController.login",
  "POST /validate": "UserController.validate"
};

module.exports = publicRoutes;
