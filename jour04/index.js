require('dotenv').config();

const mongoose = require('mongoose');
const Student = require('./models/student');
const Year = require('./models/year');

mongoose
  .connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@runtrackjscluster.ykdd4bt.mongodb.net/${process.env.DATABASE_NAME}`
  )
  .then(() => console.log('Connected to the database!'))
  .catch((error) => console.error(error));

// generateData();
async function generateData() {
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

Year.findOne({ year: 'Bachelor 1' }).then((year) => {
  Student.findOne({
    year_id: year._id,
  })
    .then((student) => console.log(student))
    .catch((error) => console.error(error));
});
