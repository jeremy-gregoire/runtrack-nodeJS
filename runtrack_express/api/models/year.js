const mongoose = require('mongoose');

const yearSchema = new mongoose.Schema({
  year: String,
});

module.exports = mongoose.model('Year', yearSchema, 'year');
