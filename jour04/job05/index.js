require('dotenv').config();

const mongoose = require('mongoose');

mongoose
  .connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`
  )
  .then(() => console.log('Connected to the database!'))
  .catch((error) => console.error(error));

// Creating schemas and models
const studentSchema = new mongoose.Schema({
  lastname: String,
  firstname: String,
  student_number: Number,
  year_id: mongoose.Schema.Types.ObjectId,
});

const yearSchema = new mongoose.Schema({
  year: String,
});

const Student = mongoose.model('student', studentSchema, 'student');
const Year = mongoose.model('year', yearSchema, 'year');

Student.aggregate([
  {
    $lookup: {
      from: Year,
      localField: '_id',
      foreignField: 'year_id',
      as: 'year',
    },
  },
  { $unwind: '$year' },
  {
    $project: {
      _id: 1,
      lastname: 1,
      firstname: 1,
      student_number: 1,
      year: '$year',
    },
  },
])
  .then((data) => console.log('Students of LaPlateforme with their years\n', data))
  .catch((error) => console.error(error));
