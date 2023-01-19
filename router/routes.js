const express = require('express');
const router = express.Router();

// ------------------------------------------- Controllers --------------------------------------------- //
const authController = require('../controllers/authController');
const studentController = require('../controllers/studentsController');
const teacherController = require('../controllers/teachersController');

//--------------------------------------------- Middlewares --------------------------------------------- //
const auth = require('../middlewares/auth');

// -------------------------------------------- Authentication Routes ----------------------------------------- //
router.post('/auth/login', authController.teacherLogin);

//---------------------------------------------- Students Routes ---------------------------------------------- //
router.get('/student/getGroups/:course', auth, studentController.getGroupsByCourse);

//---------------------------------------------- Teachers Routes ---------------------------------------------- //
router.post('/teacher/create', auth, teacherController.createTeacher);
router.get('/teacher', auth, teacherController.getAllTeachers);
router.delete('/teacher/delete/:teacher_id', auth, teacherController.deleteTeacher);

module.exports = router;