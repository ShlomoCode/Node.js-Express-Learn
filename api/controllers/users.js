const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const zxcvbn = require('zxcvbn')

module.exports = {
    signup: (req, res) => {
        const { email, password } = req.body;

        const weakness = zxcvbn(password)

        if (weakness.score <= 2) {
            return res.status(500).json({
                message: "Weak password",
                weakness: weakness.feedback
            })
        }

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
    login: async (req, res) => {
        const { email, password } = req.body;

        const users = await User.find({ email })
        if (users.length === 0) {
            return res.status(401).json({
                message: "Auth faild"
            })
        }

        const [user] = users;

        bcrypt.compare(password, user.password, (error, result) => {
            if (error) {
                return res.status(401).json({
                    message: "Auth faild"
                })
            }

            if (result === true) {
                const token = jwt.sign(
                    { id: user._id, email: user.email },
                    process.env.JWT_KEY,
                    { expiresIn: "1H" })

                return res.status(200).json({
                    message: "Auth succeful",
                    token
                })
            } else {
                return res.status(401).json({
                    message: "Auth faild"
                })
            }
        })
    }
}