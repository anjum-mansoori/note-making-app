const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
    color: String
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);