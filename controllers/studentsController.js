const Student = require('../models/students');

const getGroupsByCourse = async (req, res) => {
    const { course } = req.query;
    console.log(course);
}

exports.getGroupsByCourse = getGroupsByCourse;