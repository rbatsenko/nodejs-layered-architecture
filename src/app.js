const express = require('express');

const app = express();
const bookRoutes = require('./routes/bookRoutes');
const { notFound, error } = require('./middlewares/errorMiddleware');

app.use(express.json());
app.use(bookRoutes);
app.use(notFound);
app.use(error);

module.exports = app;
