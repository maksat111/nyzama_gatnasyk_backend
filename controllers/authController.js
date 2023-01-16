const jwt = require('jsonwebtoken');
const Teacher = require('../models/teachers');
const bcrypt = require('bcryptjs');

const teacherRegister = async (req, res) => {
    try {
        const { name, surname, username, password } = req.body;
        const foundTeacher = await Teacher.findOne({ username });

        if (foundTeacher) {
            return res.status(409).json({ success: 0, message: 'This Teacher exists!' });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const teacher = await Teacher.create({
            name,
            surname,
            username,
            password: encryptedPassword,
        });

        const token = jwt.sign(
            { teacher_id: teacher._id, username },
            process.env.TOKEN_KEY,
            {
                expiresIn: "15h",
            }
        );

        teacher.token = token;
        res.status(201).json({ success: 1, data: teacher });
    } catch (err) {
        res.status(500).json({
            success: 0,
            message: err.message
        });
    }
}

const teacherLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const foundTeacher = await Teacher.findOne({ username });

        if (foundTeacher && (await bcrypt.compare(password, foundTeacher.password))) {
            const token = jwt.sign(
                { teacher_id: foundTeacher._id, username },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "15h",
                }
            );
            foundTeacher.token = token;
            return res.status(200).json({ success: 1, data: foundTeacher });
        }

        res.status(400).json({ success: 0, msg: 'Invalid username or password!' });
    } catch (err) {
        res.status(500).json({
            success: 0,
            message: err.message
        })
    }
}


exports.teacherLogin = teacherLogin;
exports.teacherRegister = teacherRegister;