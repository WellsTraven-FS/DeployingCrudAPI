const mongoose = require("mongoose");

const studentchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model("Student", studentchema);
