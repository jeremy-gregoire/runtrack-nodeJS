require('dotenv').config();

const mongoose = require('mongoose');

mongoose
  .connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`
  )
  .then(() => console.log('Connected to the database!'))
  .catch((error) => console.error(error));
