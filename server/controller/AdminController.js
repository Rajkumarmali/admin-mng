const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admins = require('../models/admins');
const Users = require('../models/users');
const creatAdminController = async (req, res) => {
    try {
        const username = "admin";
        const password = "123456";
        const role = "admin";

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admins({
            username,
            password: hashPassword,
            role
        })

        await newAdmin.save();
        res.send({
            success: true,
            message: 'Admin Register successful'
        })


    } catch (err) {
        console.log(err);
    }
}

const loginAdminController = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admins.findOne({ username });
        if (!admin) {
            return res.send({
                success: false,
                message: "Invalid Credentials"
            })
        }
        const comprasePassword = await bcrypt.compare(password, admin.password);
        if (!comprasePassword) {
            return res.send({
                success: false,
                message: "Invalid Credentials"
            })
        }
        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SCURE);

        const adminwithoutPass = {
            _id: admin._id,
            username: admin.username,
            role: admin.role
        }
        return res.send({
            success: true,
            message: 'successful login',
            token,
            admin: adminwithoutPass
        })

    } catch (err) {
        console.log(err);
    }
}
const updataUserByAdminController = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await Users.findById(id);
        user.status = true;
        await user.save();
        res.send({
            success: true,
            message: "successful updata",

        })

    } catch (err) {
        console.log(err)
    }
}
const deletUserByAdminController = async (req, res) => {
    try {
        const { id } = req.body;
        await Users.findByIdAndDelete(id);
        res.send({
            success: true,
            message: "Successful delet user"
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = { creatAdminController, loginAdminController, updataUserByAdminController, deletUserByAdminController };