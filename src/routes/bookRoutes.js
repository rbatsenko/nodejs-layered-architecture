const layoutMiddleware = require('../middlewares/layoutMiddleware');

module.exports = db => {
  const { BOOK, BOOK_COLLECTION } = require('../../src/links/links').resources;
  const router = require('express').Router();
  const validateBookMiddleware = require('../middlewares/validateBookMiddleware');
  const bookRepository = require('../repositories/bookRepository')(db);
  const bookService = require('../services/bookService')(bookRepository);
  const { getList, createOrUpdate, details } = require('../controllers/bookController')({
    bookService,
    bookRepository,
  });

  router.use(layoutMiddleware);
  router.get(BOOK_COLLECTION, getList);
  router.post(BOOK_COLLECTION, validateBookMiddleware, createOrUpdate);
  router.get(BOOK, details);

  return router;
};
