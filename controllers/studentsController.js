const Student = require('../models/students');

const createStudent = async (req, res) => {
    try {
        const { name, surname, group_id } = req.body;

        const foundStudent = await Student.findOne({ name, surname, group_id });

        if (foundStudent) {
            return res.status(200).json({
                success: 0,
                msg: "This Student already exists!"
            });
        }

        const newStudent = await Student.create({
            name,
            surname,
            group_id
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


const deleteStudent = async (req, res) => {
    try {
        const { student_id } = req.params;
        const foundStudent = await Student.findOne({ _id: student_id });

        if (!foundStudent) {
            return res.status(200).json({ success: 0, msg: 'No student in this id!' });
        }

        const deletedStudent = await Student.deleteOne({ _id: student_id });

        res.status(200).json({
            success: 1,
            data: foundStudent
        });
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        });
    }
}

const updateStudent = async (req, res) => {
    try {
        const { student_id } = req.params;
        const { name, surname, group_id } = req.body;

        if (!name || !surname || group_id) {
            return res.status(200).json({ success: 0, msg: 'All  field are required!' })
        }

        let updatedStudent = await Student.findByIdAndUpdate(student_id, {
            name,
            surname,
            group_id,
        });

        updatedStudent.name = name;
        updatedStudent.surname = surname;
        updatedStudent.group_id = group_id;

        res.status(200).json({
            success: 1,
            data: updatedStudent
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
exports.deleteStudent = deleteStudent;
exports.updateStudent = updateStudent;