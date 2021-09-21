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

    const userData = await Category.findByPk(req.body.id);

    if (!userData){
      res.status(404).json({ message: 'User could not be found' });
    }

    res.status(200).json(userData);

  } catch {

    res.status(404).json({ message: "Something went wrong"});
  }
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
