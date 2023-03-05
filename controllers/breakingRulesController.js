const BreakingRules = require('../models/breakingRules');
const date = require('date-and-time');

const createBreaking = async (req, res) => {
    try {
        const breakings = req.body;

        breakings.forEach(element => {
            element.created_at = date.format(new Date(), 'YYYY-MM-DD');
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

        const founded = await BreakingRules.find({ created_at, group_id }).populate('student_id');
        // console.log(date.format(new Date(), 'YYYY/MM/DD HH:mm:ss'));
        res.send(founded)
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}

// const getBreaking = async (req, res) => {
//     try {
//         const { created_at, group_id } = req.query;

//         const foundBreakings = await BreakingRules.aggregate([
//             {
//                 $lookup: {
//                     from: "students", //foreign collection name 
//                     localField: "student_id",
//                     foreignField: "_id",
//                     as: "student" // name of new fild
//                 }
//             },
//             {
//                 $unwind: {
//                     path: "$student"
//                 }
//             },
//             {
//                 $group: {
//                     _id: "$student_id",
//                     // late: "$late",
//                     // uniform: "$uniform",
//                     // note: "$note"
//                 }
//             },
//             {
//                 $match: {"created_at"}
//             },
//         ])


//         res.status(200).json({ success: 1, data: foundBreakings })

//     } catch (err) {
//         res.status(500).json({
//             success: 0,
//             msg: err.message
//         })
//     }
// }

exports.createBreaking = createBreaking;
exports.getBreaking = getBreaking;