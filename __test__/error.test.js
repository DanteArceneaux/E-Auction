import errorMiddleWare from "../middleware/error";

describe("error middleware", () => {
  it("should return 500", () => {
    const err = {
      message: "error",
      statusCode: 500
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    errorMiddleWare(err, {}, res, {});

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: "error"
    });
  });
});
