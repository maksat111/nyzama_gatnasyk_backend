const mongoose = require('mongoose');

const GroupsSchema = new mongoose.Schema({
    group_number: {
        type: Number,
        required: [true, "Group number field must be filled!"]
    },
    group_major: {
        type: String,
        required: [true, "Major field must be filled!"]
    },
    course: {
        type: Number,
        required: [true, "Course field must be filled!"]
    },
});

module.exports = mongoose.model("Groups", GroupsSchema);