"use strict";

const express = require("express");
const app = express();
const itemsRoutes = require("./itemsRoutes");
// const middleware = require("./middleware");
const morgan = require("morgan");

app.use(morgan('dev'));
app.use(express.json());

// process traditional form data => req.body
app.use(express.urlencoded({ extended: true }));

// useful error class to throw
const { NotFoundError } = require("./expressError");

app.use("/items", itemsRoutes);


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;
