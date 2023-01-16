const express = require('express');
const router = express.Router();

// ------------------------------------------- Controllers --------------------------------------------- //
const authController = require('../controllers/authController');
const studentController = require('../controllers/studentsController');

//--------------------------------------------- Middlewares --------------------------------------------- //
const auth = require('../middlewares/auth');

// -------------------------------------------- Authentication Routes ----------------------------------------- //
router.post('/auth/register', auth, authController.teacherRegister);
router.post('/auth/login', authController.teacherLogin);

//---------------------------------------------- Students Routes ---------------------------------------------- //
router.get('/student/getGroups/:course', auth, studentController.getGroupsByCourse);



module.exports = router;