const layoutMiddleware = (req, res, next) => {
  const { nolayout } = req.query;
  const layout = nolayout == null;

  res.locals.layout = layout ? 'layout' : '';

  next();
};

module.exports = layoutMiddleware;
