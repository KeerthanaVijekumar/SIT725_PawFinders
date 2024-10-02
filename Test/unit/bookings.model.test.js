const { expect } = require("chai");
const sinon = require("sinon");
const mongoose = require("mongoose");
const {
  Booking,
  findByUserId,
  findByIdAndUpdate,
} = require("../../Models/bookings");

describe("Booking Model", () => {
  afterEach(() => {
    sinon.restore(); // Restore all stubs/mocks after each test
  });

  describe("findByUserId", () => {
    it("should find bookings where ownerId or sitterId matches the userId", async () => {
      const mockBookings = [
        { bookingId: "1", ownerId: "123", sitterId: "456", confirmed: true },
        { bookingId: "2", ownerId: "123", sitterId: "789", confirmed: false },
      ];

      const findStub = sinon.stub(Booking, "find").resolves(mockBookings);

      const result = await findByUserId("123");

      expect(findStub.calledOnce).to.be.true;
      expect(
        findStub.calledWith({ $or: [{ ownerId: "123" }, { sitterId: "123" }] })
      ).to.be.true;
      expect(result).to.eql(mockBookings);
    });

    it("should return an empty array if no bookings are found", async () => {
      const findStub = sinon.stub(Booking, "find").resolves([]);

      const result = await findByUserId("unknown");

      expect(findStub.calledOnce).to.be.true;
      expect(result).to.eql([]);
    });

    it("should throw an error if find operation fails", async () => {
      const findStub = sinon
        .stub(Booking, "find")
        .throws(new Error("Database error"));

      try {
        await findByUserId("123");
        expect.fail("Expected findByUserId to throw an error");
      } catch (error) {
        expect(findStub.calledOnce).to.be.true;
        expect(error.message).to.equal("Database error");
      }
    });
  });

  describe("findByIdAndUpdate", () => {
    it("should update the confirmation and set confirmed to true", async () => {
      const mockUpdatedBooking = {
        _id: "1",
        confirmation: true,
        confirmed: true,
      };

      const findOneAndUpdateStub = sinon
        .stub(Booking, "findOneAndUpdate")
        .resolves(mockUpdatedBooking);

      const result = await findByIdAndUpdate("1", true);

      expect(findOneAndUpdateStub.calledOnce).to.be.true;
      expect(
        findOneAndUpdateStub.calledWith(
          { _id: "1" },
          { confirmation: true, confirmed: true }
        )
      ).to.be.true;
      expect(result).to.eql(mockUpdatedBooking);
    });

    it("should return null if the booking is not found", async () => {
      const findOneAndUpdateStub = sinon
        .stub(Booking, "findOneAndUpdate")
        .resolves(null);

      const result = await findByIdAndUpdate("unknown", true);

      expect(findOneAndUpdateStub.calledOnce).to.be.true;
      expect(result).to.be.null;
    });

    it("should throw an error if update operation fails", async () => {
      const findOneAndUpdateStub = sinon
        .stub(Booking, "findOneAndUpdate")
        .throws(new Error("Database error"));

      try {
        await findByIdAndUpdate("1", true);
        expect.fail("Expected findByIdAndUpdate to throw an error");
      } catch (error) {
        expect(findOneAndUpdateStub.calledOnce).to.be.true;
        expect(error.message).to.equal("Database error");
      }
    });
  });
});
