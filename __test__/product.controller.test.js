const app = require("../server");
const request = require("supertest");

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTYxMWJiMmRlOTEwNTNjMDhlNjY5NyIsImlhdCI6MTY3MTEwNDA4MywiZXhwIjoxNjczNjk2MDgzfQ.gc76doakD9719Pdvq4kyzfTKFU7b5iXmbQU5w3UC214;";

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

//update product
// describe("PUT /e-auction/api/v1/products/:id", () => {
//   it("should return 200 OK", () => {
//     return request(app)
//       .put("/e-auction/api/v1/products/63975b780f919be6a9b6b849")
//       .send({
//         productName: "testtest",
//         shortDescription: "testtest",
//         detailedDescription: "testtest",
//         productCategory: "testtest",
//         startingPrice: 1000,
//         bidEndDate: "2024-03-31T00:00:00.000Z"
//       })
//       .expect(200);
//   });
// });
