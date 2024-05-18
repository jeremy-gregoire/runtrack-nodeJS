const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  lastname: String,
  firstname: String,
  student_number: Number,
  year_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Year',
  },
});

module.exports = mongoose.model('Student', studentSchema, 'student');
