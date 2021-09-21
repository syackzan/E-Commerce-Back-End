const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories including its associated Products
  try {

    const userData = await Category.findAll({
      include: [{ model: Product }],
    });

    res.status(200).json(userData);

  } catch {
    res.status(500).json({ message: "Something went wrong"});
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value including its associated Products

  try {

    const userData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });

    if (!userData){
      res.status(404).json({ message: 'User could not be found' });
    }

    res.status(200).json(userData);

  } catch {

    res.status(404).json({ message: "Something went wrong"});
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const userData = await Category.create(req.body);
    res.status(200).json({ message: 'Success! New Category Created'});

  } catch {
    res.status(500).json({ message: 'Something went wrong'});
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {

    const userData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    if (!userData){
      res.status(404).json({ message: 'No User Found'});
      return;
    }

    res.status(200).json({message: 'Success! Category Updated!'});

  } catch {
    res.status(500).json( { message: 'Something went wrong'});
  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const userData = await Category.destroy({
      where: {
        id: req.params.id,
      }
    })
    if (!userData){
      res.status(404).json({ message: 'No user found'});
      return;
    }

    res.status(200).json({ message: 'Success! Category Deleted!'})
  } catch {
    res.status(500).json({ message: 'Something went wrong'});
  }
});

module.exports = router;
