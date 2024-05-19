const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Student = require('../models/student');
const Year = require('../models/year');

// Gets all student
router.get('/', async (_, response) => {
  try {
    const students = await Student.aggregate([
      {
        $lookup: {
          from: 'year',
          localField: 'year_id',
          foreignField: '_id',
          as: 'student_year',
        },
      },
      {
        $unwind: '$student_year',
      },
      {
        $project: {
          lastname: 1,
          firstname: 1,
          student_number: 1,
          student_year: '$student_year',
        },
      },
    ]);

    if (students && students.length !== 0) {
      response.status(200).json(students);
    } else {
      response.status(200).json({
        message: 'Students not found !',
      });
    }
  } catch (error) {
    response.status(404).json({
      status: response.statusCode,
      message: error.message,
    });
  }
});

// Adds a student
router.post('/', async (request, response) => {
  let year = await Year.findOne({ year: request.body.year });

  const student = new Student({
    lastname: request.body.lastname,
    firstname: request.body.firstname,
    student_number: request.body.student_number,
    year_id: year._id,
  });

  try {
    const saveStudent = await student.save();
    response.status(201).json(saveStudent);
  } catch (error) {
    response.status(400).json({
      status: response.statusCode,
      message: error.message,
    });
  }
});

module.exports = router;
