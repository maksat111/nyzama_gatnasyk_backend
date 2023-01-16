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
    group: {
        type: Number,
        required: [true, "Group field must be filled!"]
    },
    course: {
        type: String,
        required: [true, "Name field must be filled!"]
    },
});

module.exports = mongoose.model("Students", StudentSchema);