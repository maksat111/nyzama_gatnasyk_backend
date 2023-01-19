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

        const foundGroup = await Group.findOne({ group_number });

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
        const groups = await Group.find();
        res.status(200).json({
            success: 1,
            data: groups
        });
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}


const deleteGroup = async (req, res) => {
    try {
        const { group_id } = req.params;
        const foundGroup = await Group.findOne({ _id: group_id });

        if (!foundGroup) {
            return res.status(200).json({ success: 0, msg: 'No Group in this id!' });
        }

        const deletedGroup = await Group.deleteOne({ _id: group_id });

        res.status(200).json({
            success: 1,
            data: foundGroup
        });
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        });
    }
}

const updateGroup = async (req, res) => {
    try {
        const { group_id } = req.params;
        const { group_number, group_major, course } = req.body;

        let updatedGroup = await Group.findByIdAndUpdate(group_id, {
            group_number,
            group_major,
            course
        });

        updatedGroup.group_number = group_number;
        updatedGroup.group_major = group_major;
        updatedGroup.course = course;

        res.status(200).json({
            success: 1,
            data: updatedGroup
        })
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}

const searchGroup = async (req, res) => {
    try {
        const { group_number } = req.query;

        const regExp = new RegExp(Number(group_number));

        const query = {
            $expr: {
                $regexMatch: {
                    input: { $toString: `$group_number` },
                    regex: regExp,
                },
            }
        };

        const foundGroup = await Group.find(query);

        res.status(200).json({
            success: 1,
            data: foundGroup
        })
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}

exports.getAllGroups = getAllGroups;
exports.createGroup = createGroup;
exports.deleteGroup = deleteGroup;
exports.updateGroup = updateGroup;
exports.searchGroup = searchGroup;