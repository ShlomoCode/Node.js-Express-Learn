const jwt = require("jsonwebtoken");

const checkAuth = function (req, res, next) {
    try {
        const token = req.headers.authorization.replace("Bearer ", "")
        jwt.verify(token, process.env.JWT_KEY)
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Auth faild"
        })
    }
}

module.exports = checkAuth;