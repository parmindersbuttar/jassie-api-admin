const { validationResult } = require('express-validator');
const Category = require('../models/Category');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const CtgController = () => {
    const register = async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const { body } = req;
      try {
        const category = await Category.create({
          name: body.name,
          description : body.description
        });
        // const token = authService().issue({ id: user.id });

        return res.status(200).json({ category });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }  
    };
  
    const getAll = async (req, res) => {
      try {
        const category = await Category.findAll({
          order:[
            ['updatedAt', 'DESC']
          ]
        });
  
        return res.status(200).json({ category });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    };

    const updateCategory = async(req, res) => {
      try{
        const category = await Category.update(req.body, {where: req.params})
        return res.status(200).json({ category });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    const deleteCategory = async(req, res) => {
      try{
        console.log("request dsad :: ",req.params)
        const category = await Category.destroy({
          where:req.params
        })
        return res.status(200).json({ category });
      }catch(err){
        console.log("error in delete Category :: ",err)
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }
  
  
    return {
      register,
      getAll,
      updateCategory,
      deleteCategory
    };
  };
  
  module.exports = CtgController;
  