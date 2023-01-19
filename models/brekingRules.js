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
    note: {
        type: String,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("BreakingRules", BrekingRulesSchema);