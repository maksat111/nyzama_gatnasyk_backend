const mongoose = require('mongoose');

const BrekingRulesSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Students'
    },
    uniform: {
        type: Boolean,
        default: false
    },
    late: {
        type: Boolean,
        default: false
    },
    time: {
        type: Date,
        default: Date.now
    },
    note: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model("BreakingRules", BrekingRulesSchema);