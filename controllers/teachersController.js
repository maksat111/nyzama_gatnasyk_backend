const Teacher = require('../models/teachers');
const bcrypt = require('bcryptjs');

const createTeacher = async (req, res) => {
    try {
        const { name, surname, username, password } = req.body;
        const foundTeacher = await Teacher.findOne({ username });

        if (foundTeacher) {
            return res.status(403).json({ success: 0, message: 'This username is not aviable!' });
        }

        const foundTeacherByName = await Teacher.findOne({ name, surname });

        if (foundTeacherByName) {
            return res.status(200).json({ success: 0, message: 'This Teacher already registered!' });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const teacher = await Teacher.create({
            name,
            surname,
            username,
            password: encryptedPassword,
        });

        res.status(201).json({ success: 1, data: teacher });
    } catch (err) {
        res.status(500).json({
            success: 0,
            message: err.message
        });
    }
}


const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();

        res.status(200).json({
            success: 1,
            data: teachers
        });
    } catch (err) {
        res.status(500).json({
            success: 0,
            message: err.message
        });
    }
}


const deleteTeacher = async (req, res) => {
    try {
        const { teacher_id } = req.params;
        const foundTeacher = await Teacher.findOne({ _id: teacher_id });

        if (!foundTeacher) {
            return res.status(200).json({ success: 0, msg: 'No teacher in this id!' });
        }

        const deletedTeacher = await Teacher.deleteOne({ _id: teacher_id });

        res.status(200).json({
            success: 1,
            data: foundTeacher
        });
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        });
    }
}

const updateTeacher = async (req, res) => {
    try {
        const { teacher_id } = req.params;
        const { name, surname, username, password } = req.body;

        const encryptedPassword = await bcrypt.hash(password, 10);

        let updatedTeacher = await Teacher.findByIdAndUpdate(teacher_id, {
            name,
            surname,
            username,
            password: encryptedPassword
        });

        updatedTeacher.name = name;
        updatedTeacher.surname = surname;
        updatedTeacher.username = username;
        updatedTeacher.password = encryptedPassword;

        res.status(200).json({
            success: 1,
            data: updatedTeacher
        })
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}

exports.createTeacher = createTeacher;
exports.getAllTeachers = getAllTeachers;
exports.deleteTeacher = deleteTeacher;
exports.updateTeacher = updateTeacher;