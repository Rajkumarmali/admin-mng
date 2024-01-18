const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String
    },
    role: {
        type: String
    }
})
const Admins = mongoose.model("Admins", adminSchema)
module.exports = Admins