const app = require("../server");
const request = require("supertest");

describe("GET /e-auction/api/v1/users", () => {
  it("should return 200 OK", () => {
    return request(app)
      .get("/e-auction/api/v1/users")
      .expect(200);
  });
});

//get user by id
describe("GET /e-auction/api/v1/users/:id", () => {
  it("should return 200 OK", () => {
    return request(app)
      .get("/e-auction/api/v1/users/639609f69f6b7e872a005a05")
      .expect(200);
  });
});

//add user
describe("POST /e-auction/api/v1/users", () => {
  it("should return 201 OK", () => {
    return request(app)
      .post("/e-auction/api/v1/users/add-user")
      .send({
        role: "buyer",
        firstName: "testtest",
        lastName: "testtest",
        //random email address with 5 digits
        email: "testtest" + Math.floor(Math.random() * 100000) + "@gmail.com",

        pin: 1234,
        address: "342 E. Foss",
        phone: 1234567890,
        city: "Flint",
        state: "Michigan"
      })
      .expect(201);
  });
});
