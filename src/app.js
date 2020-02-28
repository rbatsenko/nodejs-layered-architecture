const express = require("express");
const app = express();

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/booksapi';

let books;
MongoClient.connect(url, function (err, client) {
    if (err) console.log(err);
    setTimeout(function () {
        books = client.db().collection("books");
    }, 10000);
});
let booksPromise = MongoClient.connect(url).then(function (client) {
    return client.db().collection("books");
});


// static typing: interface
// dynamic typing: duck typing
function log(req, res, next) {
    console.log("new request at " + new Date());
    next();
}

function auth(req, res, next) {
    console.log("doing auth");
    next();
}

app.use(express.json());
app.use(log);
app.use(auth);

app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.post("/book", async function (req, res, next) {
    try {
        const {title, authors, isbn, description} = req.body;

        const books = await booksPromise;
        await books.updateOne(
            {isbn: isbn},
            {$set: {title, authors, isbn, description}},
            {upsert: true}
        );

        res.json({title, authors, isbn, description});
    } catch(e) {
        next(e);
    }
});
app.get("/book/:isbn", async function (req, res, next) {
    try {
        const isbn = req.params.isbn;

        const books = await booksPromise;
        const book = await books.findOne({isbn}, {projection: {_id: false}});
        res.json(book);
    } catch(e) {
        next(e);
    }
});


app.use(function notFound(req, res, next) {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});


app.use(function error(err, req, res, next) {
    res.status(err.status || 500);
    res.json({message: err.message, error: err.stack});
});

module.exports = app;