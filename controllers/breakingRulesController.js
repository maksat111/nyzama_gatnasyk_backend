const BreakingRules = require('../models/brekingRules');
const date = require('date-and-time');

const createBreaking = async (req, res) => {
    try {
        const breakings = req.body;

        breakings.forEach(element => {
            element.created_at = date.format(new Date(), 'YYYY/MM/DD HH:mm:ss');
        });

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
        const { created_at, group_id } = req.query;

        const founded = await BreakingRules.find({ "created_at": { "$gte": created_at, "$lt": created_at } });
        // console.log(date.format(new Date(), 'YYYY/MM/DD HH:mm:ss'));
        res.send(founded)
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}

exports.createBreaking = createBreaking;
exports.getBreaking = getBreaking;