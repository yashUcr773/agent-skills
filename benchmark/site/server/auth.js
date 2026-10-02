var jwt = require('jsonwebtoken');

var SECRET = process.env.JWT_SECRET || 'secret';

function sign(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET);
}

function requireUser(req, res, next) {
  var header = req.headers.authorization || '';
  var token = header.replace('Bearer ', '');
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch (e) {
    res.json({ error: 'Please log in' });
  }
}

module.exports = { sign: sign, requireUser: requireUser };
