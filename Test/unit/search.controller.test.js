const chai = require("chai");
const sinon = require("sinon");
const { expect } = chai;
const { searchdogsitter } = require("../../Controllers/searchcontroller");
const Search = require("../../Models/searchmodel");
const httpMocks = require("node-mocks-http");

describe("searchdogsitter", () => {
  let req, res, next;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return 400 if location query parameter is missing", async () => {
    req.query = {};

    await searchdogsitter(req, res);

    expect(res.statusCode).to.equal(400);
    const data = res._getJSONData();
    expect(data).to.have.property(
      "error",
      "Location query parameter is required"
    );
  });

  it("should return search results with status 200 for valid location", async () => {
    req.query = { location: "Melbourne" };

    const mockResults = [{ suburb: "Melbourne", sitter: "John Doe" }];
    const findStub = sinon.stub(Search, "find").resolves(mockResults);

    await searchdogsitter(req, res);
    console.log(res);

    expect(res.statusCode).to.equal(200);
    const data = res._getJSONData();
    expect(data).to.deep.equal(mockResults);
    expect(findStub.calledOnceWith({ suburb: new RegExp("Melbourne", "i") })).to
      .be.true;
  });

  it("should handle errors and return status 500", async () => {
    req.query = { location: "Melbourne" };

    // Simulate a database error
    const findStub = sinon
      .stub(Search, "find")
      .throws(new Error("Database error"));

    await searchdogsitter(req, res);

    expect(res.statusCode).to.equal(500);
    const data = res._getJSONData();
    expect(data).to.have.property("error", "Failed to fetch search results");
    expect(findStub.calledOnce).to.be.true;
  });
});
