const wrapWithTryCatch = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

const withErrorHandling = (wrapper, controllerObj) => Object.entries(controllerObj)
  .reduce((accCur, [key, fn]) => ({ ...accCur, [key]: wrapper(fn) }), {});

module.exports = ({ bookService, bookRepository }) => withErrorHandling(wrapWithTryCatch, {
  async createOrUpdate(req, res) {
    // HTTP
    const {
      title, authors, isbn, description,
    } = req.body;

    // JS
    await bookService.createOrUpdate({
      title,
      authors,
      isbn,
      description,
    });

    // HTTP
    res.redirect(`/book/${isbn}`);
  },
  async details(req, res, next) {
    const { isbn } = req.params;
    const { nolayout } = req.query;
    const layout = nolayout == null;

    const book = await bookRepository.findOne(isbn);

    if (!book) {
      next();
    }

    res.format({
      'text/html': () => {
        // reprezentacja HTML
        res.render('book', { book, layout: layout ? 'layout' : '' });
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
