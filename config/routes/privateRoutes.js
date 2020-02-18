const privateRoutes = {
  'GET /users': 'UserController.getAll',
  'GET /category': 'CtgController.getAll',
  'PUT /category/:id': 'CtgController.updateCategory',
  'DELETE /category/:id': 'CtgController.deleteCategory',
};

module.exports = privateRoutes;
