// const { expect } = require('chai');
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// const jsdom = require('jsdom');
// const { JSDOM } = jsdom;
// const { window } = new JSDOM('<!DOCTYPE html><div id="map"></div><button id="onGoingServices"></button><table><tbody id="bookingTableBody"></tbody></table>');

// global.window = window;
// global.document = window.document;
// global.navigator = window.navigator;


// require('./script');

// chai.use(sinonChai);

// describe('Map and Booking Tests', function() {
//   let map, marker;
  
//   beforeEach(() => {
//     global.google = {
//       maps: {
//         Map: sinon.stub().callsFake((element, options) => {
//           map = { ...options, element };
//           return map;
//         }),
//         Marker: sinon.stub().callsFake((options) => {
//           marker = options;
//           return marker;
//         })
//       }
//     };
//   });

//   it('should initialize the map and marker', () => {

//     initMap();
    
//     expect(google.maps.Map).to.have.been.calledOnce;
//     expect(google.maps.Marker).to.have.been.calledOnce;
//     expect(marker.position).to.deep.equal({ lat: -34.397, lng: 150.644 });
//     expect(map.center).to.deep.equal({ lat: -34.397, lng: 150.644 });
//   });

//   it('should toggle map visibility when button is clicked', () => {
//     const button = document.getElementById('onGoingServices');
//     button.click();

//     expect(document.getElementById('map').style.display).to.equal('block');

//     button.click();
//     expect(document.getElementById('map').style.display).to.equal('none');
//   });

//   it('should fetch and display bookings', async () => {
//     global.fetch = sinon.stub().resolves({
//       json: () => Promise.resolve([
//         { name: 'John Doe', phone: '1234567890', date: '2024-09-17T00:00:00Z', time: '10:00 AM' }
//       ])
//     });

//     await fetchBookings();
    
//     const bookingTableBody = document.getElementById('bookingTableBody');
//     const rows = bookingTableBody.getElementsByTagName('tr');

//     expect(rows).to.have.lengthOf(1);
//     expect(rows[0].children[0].textContent).to.equal('John Doe');
//     expect(rows[0].children[1].textContent).to.equal('1234567890');
//     expect(rows[0].children[2].textContent).to.equal(new Date('2024-09-17T00:00:00Z').toLocaleDateString());
//     expect(rows[0].children[3].textContent).to.equal('10:00 AM');
//   });
// });
