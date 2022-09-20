const express = require('express');
const toursControllers = require('../../controllers/toursController');

const router = express.Router();

router.route('/trending').get(toursControllers.getTrending);
router.route('/cheapest').get(toursControllers.getCheapest);

router
  .route('/')
  .get(toursControllers.getAllTours)
  .post(toursControllers.createTour);

router
  .route('/:id')
  .get(toursControllers.getOneTourById)
  .patch(toursControllers.updateById);

module.exports = router;
