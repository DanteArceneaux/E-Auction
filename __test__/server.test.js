const server = require("../server");
const request = require("supertest");

describe("GET /e-auction/api/v1/users", () => {
  it("should return 200 OK", () => {
    return request(server)
      .get("/e-auction/api/v1/users")
      .expect(200);
  });
});

//get all products
describe("GET /e-auction/api/v1/sellers/products", () => {
  it("should return 200 OK", () => {
    return request(server)
      .get("/e-auction/api/v1/products")
      .expect(200);
  });
});
