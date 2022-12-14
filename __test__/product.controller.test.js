const app = require("../server");
const request = require("supertest");

describe("GET /e-auction/api/v1/products", () => {
  it("should return 200 OK", () => {
    return request(app)
      .get("/e-auction/api/v1/products")
      .expect(200);
  });
});
