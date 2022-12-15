const app = require("../server");
const request = require("supertest");

//register user
describe("POST /e-auction/api/v1/auth/register", () => {
  it("should return 201 OK", () => {
    return request(app)
      .post("/e-auction/api/v1/auth/register")
      .send({
        firstName: "testtest",
        lastName: "testtest",
        email: "testgest" + Math.floor(Math.random() * 100) + "@gmail.com",
        pin: 1234,
        phone: 1234567890,
        state: "Michigan",
        city: "Flint",
        role: "seller"
      })
      .expect(200);
  });
});
