const app = require("../server");
const request = require("supertest");

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWJkNjhmNDdkODM3ZGY2ZDc5NGJjMiIsImlhdCI6MTY3MTE1NzM5MSwiZXhwIjoxNjczNzQ5MzkxfQ.xvRRAgD9_mO90hiNk4cO4EkzL6HByv2zmFcB-RP26wc;";

describe("GET /e-auction/api/v1/products", () => {
  it("should return 200 OK", () => {
    return request(app)
      .get("/e-auction/api/v1/products")
      .expect(200);
  });
});

//add product
describe("POST /e-auction/api/v1/products", () => {
  it("should return 201 OK", () => {
    return (
      request(app)
        //set token
        .set("Authorization", `Bearer ${TOKEN}`)
        .post("/e-auction/api/v1/products/add-product")
        .send({
          productName: "testtest",
          shortDescription: "testtest",
          detailedDescription: "testtest",
          productCategory: "testtest",
          startingPrice: 1000,
          bidEndDate: "2024-03-31T00:00:00.000Z"
        })
        .expect(201)
    );
  });
});

//getproduct by id
describe("GET /e-auction/api/v1/products/:id", () => {
  it("should return 200 OK", () => {
    return request(app)
      .get("/e-auction/api/v1/products/63975b780f919be6a9b6b849")
      .expect(200);
  });
});

//delete product by id
describe("DELETE /e-auction/api/v1/products/:id", () => {
  it("should return 200 OK", () => {
    return request(app)
      .delete("/e-auction/api/v1/products/639bd739c06ec81922edfdcd")
      .set("Authorization", `Bearer ${TOKEN}`)
      .expect(200);
  });
});

//update product by id
describe("PUT /e-auction/api/v1/products/:id", () => {
  it("should return 200 OK", () => {
    return request(app)
      .put("/e-auction/api/v1/products/639bd739c06ec81922edfdcd")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send({
        productName: "testtest",
        shortDescription: "testtest",
        detailedDescription: "testtest",
        productCategory: "testtest",
        startingPrice: 1000,
        bidEndDate: "2024-03-31T00:00:00.000Z"
      })
      .expect(200);
  });
});
