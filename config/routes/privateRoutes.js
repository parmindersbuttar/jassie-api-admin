const privateRoutes = {
  "GET /users": "UserController.getAll",

  "GET /category": "CtgController.getAll",
  "POST /category": "CtgController.register",
  "PUT /category/:id": "CtgController.updateCategory",
  "DELETE /category/:id": "CtgController.deleteCategory",

  "POST /video": "VideoController.register",

  "POST /video_category": "VideoCategoryController.register",

  "GET /token": "TokenController.getAll",
  "POST /token": "TokenController.create",
  
  "POST /payment": "PaymentController.buyCoins"
};

module.exports = privateRoutes;
