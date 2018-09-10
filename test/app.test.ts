import request from "supertest";
import app from "../src/app";

describe("GET /api", () => {
  it("should return 200 OK", (done) => {

    request(app).get("/shows")
    .expect('Content-Type', /json/)
    .expect(200, done )

  });

  it("should return 404", (done) => {
    request(app).get("/cast")
      .expect(404, done);
  });

}); 
