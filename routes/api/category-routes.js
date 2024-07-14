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
    res.status(200).json({message: "Category added successfully"});
  }catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try{
    const updateCategory = await Category.update(req.body,{
      where:{
        id : req.params.id,
      }
    })
    if(!updateCategory){
      res.status(404).json({message: 'no category with this id was found'});
      return;
    }
    res.status(200).json({message: "Category updated successfully"});

  }catch(err){
    res.status(500).json(err)
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try{
    const dltCategory = await Category.destroy({
      where:{
        id: req.params.id
      } 
    })

    if(dltCategory === 0){
      res.status(404).json({message:'no category found with the requested id'})
    }else{
      res.status(200).json({message: 'Category deleted successfully'});
    }

  }catch(err){
    res.status(500).json(err)
  }
});

module.exports = router;
