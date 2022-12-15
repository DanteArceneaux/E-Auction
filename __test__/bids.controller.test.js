const app = require("../server");
const request = require("supertest");

describe("GET /e-auction/api/v1/bids", () => {
  it("should return 200 OK", () => {
    return request(app)
      .get("/e-auction/api/v1/bids")
      .expect(200);
  });
});

//add bid
describe("POST /e-auction/api/v1/bids", () => {
  it("should return 201 OK", () => {
    return request(app)
      .post("/e-auction/api/v1/bids/add-bid")
      .send({
        buyerId: "639b0308839a85a92df4f0b8",
        productId: "63975b780f919be6a9b6b849",
        bidAmount: 100,
        productName: "testtest",
        shortDescription: "testtes",
        detailedDescription: "testtest",
        productCategory: "testtest",
        startingPrice: 1000,
        bidEndDate: "2024-03-31T00:00:00.000Z",
        seller: "testtest",
        email: "testtest" + Math.floor(Math.random() * 100000) + "@gmail.com"
      })
      .expect(200);
  });
});
