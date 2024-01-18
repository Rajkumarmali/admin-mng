const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    userId: {
        type: String
    },
    role: {
        type: String,
    },
    password: {
        type: String
    },
    status: {
        type: String,
        default: "false"
    },
    photo: {
        type: String
    }
})
const Users = mongoose.model("Users", userSchema);
module.exports = Users
