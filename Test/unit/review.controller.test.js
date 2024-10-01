const chai = require("chai");
const sinon = require("sinon");
const { expect } = chai;
const { getReviews, createReview } = require("../../Controllers/reviews");
const Review = require("../../Models/review");
const httpMocks = require("node-mocks-http");

describe("Review Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore(); // Restore original methods after each test
  });

  describe("getReviews", () => {
    it("should return all reviews with a status of 200", async () => {
      const mockReviews = [
        { sitterName: "Alice", rating: 5, comment: "Great!" },
      ];
      sinon.stub(Review, "find").returns(Promise.resolve(mockReviews)); // Mock the Review.find method

      await getReviews(req, res);

      expect(res.statusCode).to.equal(200);
      const data = res._getJSONData(); // Extract the response data
      expect(data).to.deep.equal(mockReviews);
    });

    it("should return a 500 status when there is an error fetching reviews", async () => {
      sinon.stub(Review, "find").throws(new Error("Database error"));

      await getReviews(req, res);

      expect(res.statusCode).to.equal(500);
      const data = res._getJSONData();
      expect(data).to.have.property("error", "Failed to fetch reviews");
    });
  });

  describe("createReview", () => {
    it("should create a new review and return it with status 201", async () => {
      req.body = { sitterName: "Alice", rating: 5, comment: "Great sitter!" };
      const mockReview = new Review(req.body);
      sinon.stub(mockReview, "save").returns(Promise.resolve(mockReview));

      await createReview(req, res);

      expect(res.statusCode).to.equal(201);
      const data = res._getJSONData();
      expect(data).to.deep.equal(req.body);
      done();
    });

    it("should return a 500 status when there is an error creating a review", async () => {
      req.body = { sitterName: "Alice", rating: 5, comment: "Great sitter!" };
      const mockReview = new Review(req.body);
      sinon.stub(mockReview, "save").throws(new Error("Database error"));

      await createReview(req, res);

      expect(res.statusCode).to.equal(500);
      const data = res._getJSONData();
      expect(data).to.have.property("error", "Failed to create review");
    });
  });
});
