const Group = require('../models/groups');

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