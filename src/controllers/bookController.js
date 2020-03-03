const { bookLink } = require('../links/links');

const wrapWithTryCatch = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

const withErrorHandling = (wrapper, controllerObj) =>
  Object.entries(controllerObj).reduce((accCur, [key, fn]) => ({ ...accCur, [key]: wrapper(fn) }), {});

module.exports = ({ bookService, bookRepository }) =>
  withErrorHandling(wrapWithTryCatch, {
    async getList(req, res) {
      const books = await bookRepository.getList();

      res.format({
        'text/html': () => {
          res.render('books', {
            books: books.map(book => ({ ...book, url: bookLink(book.isbn) })),
            layout: res.locals.layout,
          });
        },
        'application/json': () => {
          res.json(books);
        },
        default: () => {
          res.json(books);
        },
      });
    },
    async createOrUpdate(req, res) {
      // HTTP
      const { title, authors, isbn, description } = req.body;

      // JS
      await bookService.createOrUpdate({
        title,
        authors,
        isbn,
        description,
      });

      // HTTP
      res.redirect(bookLink(isbn));
    },
    async details(req, res, next) {
      const { isbn } = req.params;

      const book = await bookRepository.findOne(isbn);

      if (!book) {
        next();
      }

      res.format({
        'text/html': () => {
          res.render('book', {
            book,
            layout: res.locals.layout,
          });
        },
        'application/json': () => {
          res.json(book);
        },
        default: () => {
          res.json(book);
        },
      });
    },
  });
