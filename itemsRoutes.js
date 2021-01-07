const express = require("express");

const db = require("./fakeDb");
const router = new express.Router();

//errors class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

/** GET /items: get list of items */
router.get("/", function (req, res, next) {
  return res.json( db.items );
});

/** POST /items: accept JSON body, add item, and return it: */
router.post("/", function (req, res, next) {
  let { name, price } = req.body;
  db.items.push({ name, price });
  return res.json({ name, price});
});

/** GET /items/:name: return single item: */
router.get("/:name", function (req, res, next) {
  for (let item of db.items) {
    if (item.name === req.params.name) {
      return res.json({ item });
    } 
  }
  throw new NotFoundError(`${req.params.name} not found.`)
});

/** PATCH /items/:name: accept JSON body, modify item, return it: */
router.patch("/:name", function (req, res, next) {
  let { name, price } = req.body;

  if(Number.isNaN(price)){
    throw new BadRequestError("Please enter a valid price"); 
  }

  for (let item of db.items) {
    if (item.name === name) {
      item.price = price;
      return res.json({ item });
    } 
  }
  throw new NotFoundError(`${name} not found.`);
});

/** DELETE /items/:name: delete item: */
router.delete("/:name", function (req, res, next) {
  let name  = req.params.name;

  for (let i = 0; i < db.items.length; i++) {
    let item = db.items[i];
    if (item.name === name) {
      db.items.splice(i, 1);
      return res.json({ message: "Deleted" });
    } 
  }
  throw new NotFoundError(`${name} not found.`);
});

module.exports = router;
