const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name field must be filled!"]
    },
    surname: {
        type: String,
        required: [true, "Surname field must be filled!"]
    },
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Groups'
    },
    breakingRoules_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BreakingRules'
    }
});

module.exports = mongoose.model("Students", StudentSchema);