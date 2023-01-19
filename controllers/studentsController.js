const Student = require('../models/students');

const createStudent = async (req, res) => {
    try {
        const { name, surname, group_id, course } = req.body;

        const foundStudent = await Student.findOne({ name, surname, group_id, course });

        if (foundStudent) {
            return res.status(200).json({
                success: 0,
                msg: "This Student already exists!"
            });
        }

        const newStudent = await Student.create({
            name,
            surname,
            group_id,
            course
        });

        res.status(201).json({
            success: 1,
            data: newStudent
        });
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}

const getStudentsByGroupId = async (req, res) => {
    try {
        const { group_id } = req.params;
        const foundStudents = await Student.find({ group_id });
        res.status(200).json({
            success: 1,
            data: foundStudents
        })
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }

}

exports.getStudentsByGroupId = getStudentsByGroupId;
exports.createStudent = createStudent;