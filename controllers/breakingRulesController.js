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

exports.createBreaking = createBreaking;