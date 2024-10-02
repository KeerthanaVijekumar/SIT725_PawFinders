const { expect } = require("chai");
const sinon = require("sinon");
const booking = require("../../Models/bookings");
const {
  getBookingByUserId,
  confirmBooking,
} = require("../../Controllers/bookings");

describe("Booking Controller", () => {
  describe("getBookingByUserId", () => {
    let req, res, next;

    beforeEach(() => {
      req = { params: { userId: "12345" } };
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      next = sinon.stub();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should return bookings for a valid user ID", async () => {
      const mockBookings = [
        { id: "1", userId: "12345", details: "Booking details" },
      ];
      sinon.stub(booking, "findByUserId").resolves(mockBookings);

      await getBookingByUserId(req, res);

      expect(booking.findByUserId.calledOnceWith("12345")).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockBookings)).to.be.true;
    });

    it("should return 404 if no bookings are found", async () => {
      sinon.stub(booking, "findByUserId").resolves(null);

      await getBookingByUserId(req, res);

      expect(booking.findByUserId.calledOnceWith("12345")).to.be.true;
      expect(res.status.calledWith(404)).to.be.true;
      expect(
        res.json.calledWith({ error: "Failed to fetch specific booking1" })
      ).to.be.false;
    });

    it("should return 500 if there is an error", async () => {
      sinon.stub(booking, "findByUserId").throws(new Error("Database error"));

      await getBookingByUserId(req, res);

      expect(booking.findByUserId.calledOnceWith("12345")).to.be.true;
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ error: "Failed to fetch specific booking" }))
        .to.be.true;
    });
  });

  describe("confirmBooking", () => {
    let req, res;

    beforeEach(() => {
      req = {
        body: {
          filter: { bookingId: "1" },
          update: { confirmation: { status: "confirmed" } },
        },
      };
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should return updated booking on successful confirmation", async () => {
      const mockUpdatedBooking = { id: "1", status: "confirmed" };
      sinon.stub(booking, "findByIdAndUpdate").resolves(mockUpdatedBooking);

      await confirmBooking(req, res);

      expect(
        booking.findByIdAndUpdate.calledOnceWith("1", { status: "confirmed" })
      ).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockUpdatedBooking)).to.be.true;
    });

    it("should return 404 if booking is not found", async () => {
      sinon.stub(booking, "findByIdAndUpdate").resolves(null);

      await confirmBooking(req, res);

      expect(
        booking.findByIdAndUpdate.calledOnceWith("1", { status: "confirmed" })
      ).to.be.true;
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: "Booking not found" })).to.be.true;
    });

    it("should return 400 for validation errors", async () => {
      const validationError = new Error("Validation failed");
      validationError.name = "ValidationError";
      sinon.stub(booking, "findByIdAndUpdate").throws(validationError);

      await confirmBooking(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: "Validation failed" })).to.be.true;
    });

    it("should return 500 if there is a server error", async () => {
      sinon
        .stub(booking, "findByIdAndUpdate")
        .throws(new Error("Database error"));

      await confirmBooking(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ error: "Failed to update booking" })).to.be
        .true;
    });
  });
});
