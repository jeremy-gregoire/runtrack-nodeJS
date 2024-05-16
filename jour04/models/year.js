const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  year: String,
});

const Year = mongoose.model('year', schema, 'year');

module.exports = Year;
