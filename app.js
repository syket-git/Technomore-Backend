const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const config = require('./config');

//** Route */
const userRouteHandler = require('./routes/userRouteHandler');

const app = express();

const { PORT } = config;

//** Initialize middleware
app.use(express.json());
dotenv.config();

//** Connect with mongodb
mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    console.log('DB connected ');
  })
  .catch((err) => console.log('DB connection error'));

//** Application Route

app.use('/api/user', userRouteHandler);

app.use('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to technomore backend',
  });
});

//** Run server */
app.listen(PORT, () => console.log(`Server up and running on ${PORT}`));
