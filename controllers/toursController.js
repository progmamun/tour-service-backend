const Tours = require('../models/Tours');
const asyncHandler = require('../middleware/async');

// @desc      Get all tours
// @route     GET /tours
// @access    Public
exports.getAllTours = asyncHandler(async (req, res, next) => {
  const fields = req.query?.fields?.split(',')?.join(' ') || '';
  const sort = req.query?.sort?.split(',')?.join(' ') || '';
  const { page = 1, limit = 0 } = req.query;

  const tours = await Tours.find()
    .select(fields)
    .skip((+page - 1) * +limit)
    .limit(+limit)
    .sort(sort);

  if (!tours) {
    res.status(400).json({ success: false, message: 'something is wrong' });
  }
  res
    .status(200)
    .json({ success: true, message: 'get all tours', data: tours });
});

// @desc      Get all tours
// @route     GET /tours
// @access    Public
exports.createTour = asyncHandler(async (req, res, next) => {
  const data = req.body;
  const tour = new Tours(data);
  const result = await tour.save();

  if (!result._id) {
    return res.status(500).json({ success: false, error: 'internal error' });
  }
  res.status(201).json({ success: true, message: 'Tour Created' });
});

// @desc      Get all tours
// @route     GET /tours
// @access    Public
exports.getCheapest = asyncHandler(async (req, res, next) => {});

// @desc      Get all tours
// @route     GET /tours
// @access    Public
exports.getOneTourById = asyncHandler(async (req, res, next) => {});

// @desc      Get all tours
// @route     GET /tours
// @access    Public
exports.getTrending = asyncHandler(async (req, res, next) => {});

// @desc      Get all tours
// @route     GET /tours
// @access    Public
exports.updateById = asyncHandler(async (req, res, next) => {});
