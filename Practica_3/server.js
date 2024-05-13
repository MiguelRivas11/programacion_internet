"use strict";

const express = require('express');
const router = require('./app/controllers/router');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Use express body-parser to parse all request bodies.
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
})
