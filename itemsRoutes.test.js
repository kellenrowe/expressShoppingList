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

describe("GET /items/:name", function () {
  it("Gets an existing item", async function() {
    const resp = await request(app)
      .get(`/items/soap`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({ item: { name: "soap", price: "4.99" } });
  });
});


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