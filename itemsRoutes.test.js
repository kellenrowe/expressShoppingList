const request = require("supertest");

const app = require("./app");
let db = require("./fakeDb");

let soap = { name: "soap", price: "4.99" };

beforeEach(function() {
  db.items.push(soap);
});

afterEach(function() {
  db.items.splice();
});

/** tests GET request to items/:name */
describe("GET /items/:name", function () {
  it("Gets an existing item", async function() {
    const resp = await request(app)
      .get(`/items/soap`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({ item: { name: "soap", price: "4.99" } });
  });
});

/** tests POST request to items */
describe("POST /items", function () {
  it("Creates a new item", async function() {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: "pickles",
        price: "3"
      });
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({ name: "pickles", price: "3" });
  });
});

/** tests PATCH request to items/:name */
describe("PATCH /items/:name", function () {
  it("Updates an item", async function() {
    const resp = await request(app)
      .patch(`/items/soap`)
      .send({
        name: "soap",
        price: "3"
      });
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({ item: { name: "soap", price: "3" } });
  });
});

/** tests Delete request to items/:name */
describe("PATCH /items/:name", function () {
  it("Updates an item", async function() {
    const resp = await request(app)
      .delete(`/items/soap`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({ message: "Deleted" });
  });
});