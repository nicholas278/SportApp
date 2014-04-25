function initialize() {
    var mapOptions = {
      center: new google.maps.LatLng(49.2553531, -123.1905086),
      zoom: 12
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);
  