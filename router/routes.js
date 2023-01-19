const express = require('express');
const router = express.Router();

// ------------------------------------------- Controllers --------------------------------------------- //
const authController = require('../controllers/authController');
const studentController = require('../controllers/studentsController');
const teacherController = require('../controllers/teachersController');
const groupsController = require('../controllers/groupsController');

//--------------------------------------------- Middlewares --------------------------------------------- //
const auth = require('../middlewares/auth');

// -------------------------------------------- Authentication Routes ----------------------------------------- //
router.post('/auth/login', authController.teacherLogin);

//---------------------------------------------- Teachers Routes ---------------------------------------------- //
router.post('/teacher/create', auth, teacherController.createTeacher);
router.get('/teacher', auth, teacherController.getAllTeachers);
router.delete('/teacher/delete/:teacher_id', auth, teacherController.deleteTeacher);

//---------------------------------------------- Groups Routes ---------------------------------------------- //
router.post('/groups/create', auth, groupsController.createGroup);
router.get('/groups', auth, groupsController.getAllGroups);

//---------------------------------------------- Students Routes ---------------------------------------------- //
router.get('/students/:group_id', auth, studentController.getGroupsByCourse);


module.exports = router;