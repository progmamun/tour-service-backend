const express = require('express');
const toursControllers = require('../../controllers/toursController');

const router = express.Router();

router
  .route('/')
  .get(toursControllers.getAllTours)
  .post(toursControllers.createTour);

module.exports = router;
