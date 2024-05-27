const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    console.log(token, 'token')
    if (!token) return res.status(401).json({ error: 'Unauthorized!' })

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedToken
        next()
    } catch (err) {
        console.error(err)
        res.status(401).json({ error: 'Invalid Token!' })
    }
}

module.exports = jwtAuthMiddleware
