const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags with its associated Product data
  try{
    const getTag = await Tag.findAll({include:[{model:Product, through:ProductTag}]})
    res.status(200).json(getTag)
  }catch(err){
    res.status(404).json(err);
  }
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id` with its associated Product data
  try{
    const tagById = await Tag.findByPk(req.params.id,{include:[{model: Product,through: ProductTag}] })
    
    // if no product with id return no found message
    if(!tagById){
        res.status(404).json({message: "Tag not found"})
    }
    // else return the tag
    res.status(200).json(tagById);

  }catch(err){
    res.status(404).json(err);

  }
 
});

router.post('/', async(req, res) => {
  // create a new tag
  try{
    await Tag.create({
      tag_name: req.body.tag_name
    })
    res.status(200).json({message:"Tag has been added successfully"})

  }catch(err){
    res.status(500).json(err)
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try{
    const updateTag = await Tag.update(req.body,{
      where:{
        id:req.params.id
      }
    })
    
    if(!updateTag){
      res.status(404).json({message: 'no tag with this id was found'});
      return;
    }
    res.status(200).json({message: `Tag with id ${req.params.id} updated successfully`})
  }catch(err){
    res.status(500).json(err)
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try{
    // first find the associated tag in the product tag and deleted them before delete tag
     await ProductTag.destroy({
      where:{
        tag_id: req.params.id
      }
    });

    // delte the tag
    const dltTag = await Tag.destroy({
      where:{
        id: req.params.id
      }
    })
    // if tag not found send a message back
    if(dltTag ===0){
      res.status(404).json({message:`no tag found with the this id : ${req.params.id}`})
      // else remove the tag
    }else{
      res.status(200).json({message: `Tag with the id ${req.params.id} has been deleted `})
    }

  }catch(err){
    res.status(500).json(err)

  }
});

module.exports = router;
