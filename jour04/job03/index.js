require('dotenv').config();

const mongoose = require('mongoose');

mongoose
  .connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE_NAME}`
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

const Student = mongoose.model('student', studentSchema, 'student');

async function setupData() {
  await new Student({
    lastname: 'LeBricoleur',
    firstname: 'Bob',
    student_number: 1,
    year_id: mongoose.Types.ObjectId.createFromHexString('664619ad96cf20fb30914dff'),
  }).save();

  await new Student({
    lastname: 'Doe',
    firstname: 'John',
    student_number: 2,
    year_id: mongoose.Types.ObjectId.createFromHexString('664619ad96cf20fb30914e04'),
  }).save();

  await new Student({
    lastname: 'Dupont',
    firstname: 'Marine',
    student_number: 3,
    year_id: mongoose.Types.ObjectId.createFromHexString('664619ad96cf20fb30914e06'),
  }).save();
}

setupData();
