function initMap() {

    const defaultLocation = { lat: -34.397, lng: 150.644 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: defaultLocation,
    });
  
    // Create a marker
    const marker = new google.maps.Marker({
      position: defaultLocation,
      map: map,
      title: "Dog Walker Location",
    });
  
    // fetching live location
    function updateLocation(lat, lng) {
      const newLocation = { lat, lng };
      marker.setPosition(newLocation);
      map.setCenter(newLocation);
    }
  
    //  live location update
    document.getElementById('onGoingServices').addEventListener('click', () => {
      updateLocation(-34.397 + Math.random() * 0.01, 150.644 + Math.random() * 0.01);
    });
  }
  
  window.onload = initMap;
  