(async () => {
  const db = await require('./connection');
  const app = require('./app')(db);

  app.listen(process.env.PORT || 3001, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening on port ${process.env.PORT || 3001}!`);
  });
})();
