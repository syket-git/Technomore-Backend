const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const config = require('./config');

//** Route */
const userRouteHandler = require('./routes/userRouteHandler');
const blogRouteHandler = require('./routes/blogRouteHandler');

const app = express();

const { PORT, DB_NAME } = config;

//** Initialize middleware
app.use(express.json());
dotenv.config();

//** Connect with mongodb
mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}/${DB_NAME}`)
  .then(() => {
    console.log('DB connected ');
  })
  .catch((err) => console.log('DB connection error'));

//** Application Route

app.use('/api/user', userRouteHandler);
app.use('/api/blog', blogRouteHandler);

app.use('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to technomore backend',
  });
});

//** Error Handlers */

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ success: false, message: err });
};

app.use(errorHandler);

//** Run server */
app.listen(PORT, () => console.log(`Server up and running on ${PORT}`));
