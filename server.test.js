const testApp = require("./server"); // Import the server
const request = require("supertest"); // Import supertest

describe("GET /e-auction/api/v1/users", () => {
  it("should return 200 OK", () => {
    return request(testApp)
      .get("/e-auction/api/v1/users")
      .expect(200);
  });
});

//get all bids should return 200
describe("GET /e-auction/api/v1/bids", () => {
  it("should return 200 OK", () => {
    return request(testApp)
      .get("/e-auction/api/v1/bids")
      .expect(200);
  });
});

//get all products should return 200
describe("GET /e-auction/api/v1/products", () => {
  it("should return 200 OK", () => {
    return request(testApp)
      .get("/e-auction/api/v1/products")
      .expect(200);
  });
});
