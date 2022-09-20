const express = require('express');
const toursControllers = require('../../controllers/toursController');

const router = express.Router();

router
  .route('/')
  .get(toursControllers.getAllTours)
  .post(toursControllers.createTour);

router.route('/:id').get(toursControllers.getOneTourById);

module.exports = router;
