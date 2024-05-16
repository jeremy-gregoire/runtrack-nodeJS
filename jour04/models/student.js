const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  lastname: String,
  firstname: String,
  student_number: Number,
  year_id: mongoose.Schema.Types.ObjectId,
});

const Student = mongoose.model('student', schema, 'student');

module.exports = Student;
