const links = {
  resources: {
    BOOK: '/book/:isbn',
    BOOK_COLLECTION: '/book',
  },
  bookLink: isbn => links.resources.BOOK.replace(':isbn', isbn),
};

module.exports = links;
