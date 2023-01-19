const Group = require('../models/groups');

const createGroup = async (req, res) => {
    try {
        const { group_number, group_major, course } = req.body;

        if (!group_number || !group_major || !course) {
            return res.status(200).json({
                success: 0,
                msg: 'All fields are required!'
            })
        }

        const foundGroup = await Group.findOne({ group_number, group_major, course });

        if (foundGroup) {
            return res.status(200).json({
                success: 0,
                msg: "This group is already exists!"
            });
        }

        const newGroup = await Group.create({
            group_number,
            group_major,
            course
        });

        res.status(201).json({
            success: 1,
            data: newGroup
        });
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}

const getAllGroups = async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}

exports.getAllGroups = getAllGroups;
exports.createGroup = createGroup;