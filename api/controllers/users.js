const User = require('../models/user')

module.exports = {
    signup: (req, res) => {
        res.status(200).json({
            message: 'signup'
        })
    },
    login: (req, res) => {
        res.status(200).json({
            message: 'login'
        })
    }
}