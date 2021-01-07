const express = require("express");

const db = require("./fakeDb");
const router = new express.Router();

/** GET /items: get list of items */
router.get("/", function (req, res, next) {
  return res.json( db.items );
});

/** POST /items: accept JSON body, add item, and return it: */
router.post("/", function (req, res, next) {
  let item = req.body;
  db.items.push({ item });
  return res.json({ item });
});

/** GET /items/:name: return single item: */
router.get("/:name", function (req, res, next) {
  for (let item of db.items) {
    if (item.name === req.params.name) {
      return res.json({ item });
    } else {
      throw new NotFoundError(`${req.params.name} not found.`)
    }
  }
});

/** PATCH /items/:name: accept JSON body, modify item, return it: */
router.delete("/:id", function (req, res, next) {
  db.User.delete(req.params.id);
  return res.json({ message: "Deleted" });
});

/** DELETE /items/:name: delete item: */
router.delete("/:id", function (req, res, next) {
  db.User.delete(req.params.id);
  return res.json({ message: "Deleted" });
});

module.exports = router;


/** 
 * [
 *  {name: "name", price: "price"},
 *  {name: "name", price: "price"}
 * ]
 */