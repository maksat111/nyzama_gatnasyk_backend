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
router.get('/groups', auth, groupsController.getAllGroups);
router.post('/groups/create', auth, groupsController.createGroup);
router.delete('/groups/delete/:group_id', auth, groupsController.deleteGroup);
router.patch('/groups/update/:group_id', auth, groupsController.updateGroup);

//---------------------------------------------- Students Routes ---------------------------------------------- //
router.get('/students/:group_id', auth, studentController.getStudentsByGroupId);
router.post('/students/create', auth, studentController.createStudent);
router.delete('/students/delete/:student_id', auth, teacherController.deleteTeacher);
router.patch('/students/:student_id', auth, studentController.updateStudent);

module.exports = router;