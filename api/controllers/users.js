const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = {
    signup: (req, res) => {
        const { email, password } = req.body;
        bcrypt.hash(password, 10, async (error, hesh) => {
            if (error) {
                return res.status(500).json({
                    error
                })
            }

            const users = await User.find({ email })
            if (users.length > 0) {
                return res.status(409).json({
                    message: "Email exists"
                })
            }

            const user = new User({
                _id: new mongoose.Types.ObjectId,
                password: hesh,
                email
            })
            try {
                await user.save();

                res.status(200).json({
                    message: "User Created"
                })
            } catch (error) {
                res.status(500).json({
                    error
                })
            }
        })
    },
    login: (req, res) => {
        res.status(200).json({
            message: 'login'
        })
    }
}