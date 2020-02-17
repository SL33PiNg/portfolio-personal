const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization)
    return res.status(401).json({ status: 401, message: 'Unauthorized' })
  const token = authorization.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = decoded
  } catch (error) {
    console.log(error.name)
    if (error.name === 'JsonWebTokenError')
      return res.status(403).json({ status: 403, message: error.message })
    else if (error.name === 'TokenExpiredError')
      return res.status(403).json({ status: 403, message: error.message })
    else return res.status(500).json({ status: 500, message: error.message })
  }
  next()
}
