const BreakingRules = require('../models/brekingRules');

const createBreaking = async (req, res) => {
    try {
        const breakings = req.body;

        const createdBreakings = await BreakingRules.insertMany(breakings);

        res.status(201).json({
            success: 1,
            createdBreakings
        })
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}

const getBreaking = async (req, res) => {
    try {
        const { created_at, type } = req.query;
        let foundBreakings = [];

        if (type == 'late') {
            foundBreakings = await BreakingRules.find({ created_at, late: true });
        }

        if (type == 'uniform') {
            foundBreakings = await BreakingRules.find({ created_at, uniform: true });
        }

        res.status(200).json({ success: 1, data: foundBreakings });
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}

exports.createBreaking = createBreaking;
exports.getBreaking = getBreaking;