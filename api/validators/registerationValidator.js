const { check } = require('express-validator');

module.exports = [
  check('email').isEmail().withMessage('Invalid email'),
  check('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
  check('name').isLength({ min: 4 }).withMessage('must be at least 5 chars long'),
];
