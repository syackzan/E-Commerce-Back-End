const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags be sure to include its associated Product data
  try {
    const userData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'products'}]
    });

    res.status(200).json(userData);

  } catch {

    res.status(500).json({ message: 'Something went wrong'});
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id` be sure to include its associated Product data
  try {
    const userData = await Tag.findByPk( req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'products'}]
    })

    if(!userData){
      res.status(404).json({ message: 'No User Found'});
      return;
    }

    res.status(200).json({message: 'Success!'}, {userData});
  } catch {
    res.status(500).json( { message: 'Something went wrong'});
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const userData = await Tag.create(req.body);
    res.status(200).json(userData);

  } catch {
    res.status(500).json({ message: 'Something went wrong'});
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {

    const userData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    if (!userData){
      res.status(404).json({ message: 'No User Found'});
      return;
    }

    res.status(200).json({message: 'Success!'}, {userData});

  } catch {
    res.status(500).json( { message: 'Something went wrong'});
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value

  try {
    const userData = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    })
    if (!userData){
      res.status(404).json({ message: 'No user found'});
      return;
    }

    res.status(200).json({ message: 'Success!'}, {userData})
  } catch {
    res.status(500).json({ message: 'Something went wrong'});
  }
});

module.exports = router;
