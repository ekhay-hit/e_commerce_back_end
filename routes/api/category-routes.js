const router = require('express').Router();
const { Category, Product } = require('../../models');
const { findAll } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories and include its associated Products
 try{
  const getCategories = await Category.findAll({
   include: [{model: Product}]
  });
  res.status(200).json(getCategories);
 }catch(err){
  res.status(500).json(err);
 }
 
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value and its associated Products
  const reqId = req.params.id
  try{
    const categoryById = await Category.findByPk(reqId, { 
      include:[{model: Product}],
    });
    res.status(200).json(categoryById)

  }catch(err){
    res.status(500).json(err)
  }
});

router.post('/', async(req, res) => {
  // create a new category
  try{
    const addCategory = await Category.create({
      category_name : req.body.category_name
    })
    res.status(200).json(addCategory);
  }catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
