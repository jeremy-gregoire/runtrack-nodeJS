require('dotenv').config();

const mongoose = require('mongoose');

mongoose
  .connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@runtrackjscluster.ykdd4bt.mongodb.net/${process.env.DATABASE_NAME}`
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

async function setupData() {
  await new Year({ year: 'Bachelor 1' }).save();
  await new Year({ year: 'Bachelor 2' }).save();
  await new Year({ year: 'Bachelor 3' }).save();

  const reqYear1 = await Year.findOne({ year: 'Bachelor 1' });
  const year1 = mongoose.Types.ObjectId.createFromHexString(reqYear1.id);

  const reqYear2 = await Year.findOne({ year: 'Bachelor 2' });
  const year2 = mongoose.Types.ObjectId.createFromHexString(reqYear2.id);

  const reqYear3 = await Year.findOne({ year: 'Bachelor 3' });
  const year3 = mongoose.Types.ObjectId.createFromHexString(reqYear3.id);

  await new Student({
    lastname: 'LeBricoleur',
    firstname: 'Bob',
    student_number: 1,
    year_id: year1,
  }).save();

  await new Student({
    lastname: 'Doe',
    firstname: 'John',
    student_number: 2,
    year_id: year2,
  }).save();

  await new Student({
    lastname: 'Dupont',
    firstname: 'Marine',
    student_number: 3,
    year_id: year3,
  }).save();
}

setupData();

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
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
