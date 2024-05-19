const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Student = require('../models/student');

// Gets a student
router.get('/:id', async (request, response) => {
  try {
    const student = await Student.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId.createFromHexString(request.params.id),
        },
      },
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

    if (student && student.length !== 0) {
      response.status(200).json(student);
    } else {
      response.status(204).json({
        message: 'Student not found !',
      });
    }
  } catch (error) {
    response.status(404).json({
      status: response.statusCode,
      message: error.message,
    });
  }
});

// Deletes a student
router.delete('/:id', async (request, response) => {
  try {
    const deleteStudent = await Student.deleteOne({ _id: request.params.id });
    response.status(200).json(deleteStudent);
  } catch (error) {
    response.status(404).json({
      status: response.statusCode,
      message: error.message,
    });
  }
});

module.exports = router;
