const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Зчитуємо токен
  try {
    const [tokenType, token] = req.headers.authorization.split(' ');
    if (tokenType !== 'Bearer') {
      res.status(401);
      throw new Error('Not a bearer token');
    }

    if (!token) {
      res.status(401);
      throw new Error('No token prowided');
    }

    // Розшифровуємо токен
    const decoded = jwt.verify(token, 'pizza');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ code: 401, message: error.message });
  }

  // Якщо не змогли викидуємо помилку
  // Якщо все нормально - req.user = id;
};
