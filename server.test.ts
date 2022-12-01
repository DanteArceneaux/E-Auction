

const testApp = require("./server"); // Import the server
const request = require("supertest"); // Import supertest


describe("GET /e-auction/api/v1/seller", () => {
    it("should return 200 OK", () => {
        return request(testApp)
        .get("/e-auction/api/v1/seller")
        .expect(200);
    });
    });

