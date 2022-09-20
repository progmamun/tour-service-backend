const Tours = require('../models/Tours');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const { isValidObjectId } = require('mongoose');

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

// @desc      Create a tours
// @route     POST /tours
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

// @desc      Get cheapest tours
// @route     GET /tours/cheapest
// @access    Public
exports.getCheapest = asyncHandler(async (req, res, next) => {
  const cheapest = await Tours.find().sort('price').limit(3);
  res
    .status(200)
    .json({ success: true, message: 'cheapest tours price', data: cheapest });
});

// @desc      Get a tour by id
// @route     GET /tours/id
// @access    Public
exports.getOneTourById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await Tours.findById(id);
  const incViewCont = await Tours.updateOne(
    { _id: id },
    { $inc: { viewCount: 1 } }
  );
  if (!result || !isValidObjectId(id) || !incViewCont.acknowledged) {
    return res.status(400).json({ success: false, message: 'no data found' });
  }
  res
    .status(200)
    .json({ success: true, message: 'get tour details by id', data: result });
});

// @desc      Get all trending tours
// @route     GET /tours/trending
// @access    Public
exports.getTrending = asyncHandler(async (req, res, next) => {
  const trending = await Tours.find({}).sort('-viewCount').limit(3);
  if (!trending || trending.length === 0) {
    return next(new ErrorResponse(`No data found`, 404));
  }
  res
    .status(200)
    .json({ success: true, message: 'Trending tours', data: trending });
});

// @desc      update tours service
// @route     PATCH /tours/id
// @access    Public
exports.updateById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const result = await Tours.updateOne(
    { _id: id },
    { $set: data },
    { runValidators: true }
  );

  if (!result.acknowledged || !isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: 'no data updated' });
  }
  res.status(200).json({ success: true, message: 'tour updated' });
});
