require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;

mongoose
  .connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE_NAME}`
  )
  .then(() => console.log('Connected to the database!'))
  .catch((error) => console.error(error));

app.use(express.json());

// Route for getting all students and posting (add) one student
const studentsRouter = require('./routes/students');
app.use('/etudiants', studentsRouter);

// Route for posting and delete a student
const studentRouter = require('./routes/student');
app.use('/etudiant', studentRouter);

app.use((_, response) => {
  response.status(404).json({
    status: response.statusCode,
  });
});

app.listen(PORT, () => {
  console.log(`API listing on port ${PORT}`);
});
