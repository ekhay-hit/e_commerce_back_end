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

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
