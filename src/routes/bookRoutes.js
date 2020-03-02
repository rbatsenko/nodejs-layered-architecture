const router = require('express').Router();
const validateBookMiddleware = require('../middlewares/validateBookMiddleware');
const bookRepository = require('../repositories/bookRepository');
const bookService = require('../services/bookService')(bookRepository);
const { createOrUpdate, details } = require('../controllers/bookController')({ bookService, bookRepository });

router.post('/book', validateBookMiddleware, createOrUpdate);
router.get('/book/:isbn', details);

module.exports = router;
