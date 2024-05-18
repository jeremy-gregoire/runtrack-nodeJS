const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Student = require('../models/student');

// Gets a student
router.get('/:id', async (request, response) => {
  try {
    const student = await Student.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(request.params.id),
    });

    if (student) {
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
router.delete('/:id', (request, response) => {
  try {
    // const id = request.params.id;
    // const student =
  } catch (error) {
    response.status(404).json({
      status: response.statusCode,
      message: error.message,
    });
  }
});

module.exports = router;
