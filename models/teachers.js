const mongoose = require('mongoose');

const TeachersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name field must be filled!"]
    },
    surname: {
        type: String,
        required: [true, "Surname field must be filled!"]
    },
    username: {
        type: String,
        required: [true, "Username is required!"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
    token: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Teachers", TeachersSchema);