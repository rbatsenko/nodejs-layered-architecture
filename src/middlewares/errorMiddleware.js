const isProduction = () => process.env.NODE_ENV === 'production';

const notFound = (req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
};

// eslint-disable-next-line no-unused-vars
const error = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: isProduction() ? "It's not you, it's me" : err.stack,
  });
};

module.exports = { notFound, error };
