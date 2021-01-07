"use strict";

const { UnauthorizedError } = require("./expressError");

/** Check that name param must be Elie or raise Unauth. */
function onlyAllowElie(req, res, next) {
  if (req.params.name === "Elie") {
    return next();
  } else {
    throw new UnauthorizedError("Unauthorized");
  }
}
// end onlyAllowElie


module.exports = { logger, onlyAllowElie };