const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const cors = require('cors');

// Router file
const toursRouter = require('./routes/v1/toursRouter');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

const app = express();

// Body Parser
app.use(express.json());

app.use(cors());
app.use(express.static('public'));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/tours', toursRouter);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.all('*', (req, res) => {
  res.send('NO route found.');
});
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running is ${process.env.NODE_ENV} mode on port ${PORT}`)
);
