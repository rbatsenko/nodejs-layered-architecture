const validateBook = require('../utils/validateBook');

const validateBookMiddleware = (req, res, next) => {
  const validateErrors = validateBook(req.body);

  if (validateErrors) {
    const error = new Error();
    error.message = validateErrors;
    error.status = 400;
    next(error);
  }

  next();
};

module.exports = validateBookMiddleware;
