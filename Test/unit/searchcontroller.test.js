const { expect } = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const { Search } = require('../../Models/searchmodel'); 
const { searchdogsitter } = require('../../Controllers/searchcontroller');

describe('Search Controller : Search Dog Walker', () => {
  it('should return 400 if location is missing', async () => {
    const req = { query: {} }; // No location in the query
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    await searchdogsitter(req, res);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ error: 'Location query parameter is required' })).to.be.true;
  });

  it('should return search results if location is provided', async () => {
    const req = { query: { location: 'Sydney' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    sinon.stub(Search, 'find').resolves([{ firstName: 'John', lastName: 'Doe', suburb: 'Sydney' }]);

    await searchdogsitter(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith([{ firstName: 'John', lastName: 'Doe', suburb: 'Sydney' }])).to.be.true;

    Search.find.restore();
  });
});
