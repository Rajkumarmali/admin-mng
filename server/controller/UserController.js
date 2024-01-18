const bcrypt = require('bcrypt');
const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const createUserController = async (req, res) => {
    try {
        const { userId, password } = req.body;
        const role = "user";

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt)
        const newUser = new Users({
            userId,
            password: hashPass,
            role
        })
        await newUser.save();
        res.send({
            success: true,
            message: "User Reginster successful",
        })

    } catch (err) {
        console.log(err);
    }
}
const loginUserController = async (req, res) => {
    try {
        const { userId, password } = req.body;
        const user = await Users.findOne({ userId });
        if (!user) {
            return res.send({
                success: "false",
                message: "Invalid Credentials",
            })
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.send({
                success: false,
                message: "Invalid Credentials"
            })
        }
        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SCURE);
        const userWithOutPass = {
            _id: user._id,
            userId: user.userId,
            role: user.role
        }
        return res.send({
            success: true,
            message: "successful login",
            token,
            user: userWithOutPass
        })

    } catch (err) {
        console.log(err)
    }
}
const updateUserController = async (req, res) => {
    try {
        const { userId, name, photo } = req.body;
        const user = await Users.findOne({ userId: userId });
        user.name = name;
        user.photo = photo
        await user.save();
        return res.send({
            success: true,
            message: "User update successful",
            user
        })
    } catch (err) {
        console.log(err)
    }
}
const getUserDetailController = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await Users.findOne({ userId: userId })
        res.send({
            success: true,
            message: "Get Details of the user",
            user
        })
    } catch (err) {
        console.log(err)
        res.send("err")
    }
}

module.exports = { createUserController, loginUserController, updateUserController, getUserDetailController }