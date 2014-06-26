var map, geocoder, infowindow, autocomplete; //Google Objects
var markers;

function initialize() {
    markers = [];
    geocoder = new google.maps.Geocoder();
    infowindow = new google.maps.InfoWindow();
    autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('locationsearchinput')),
      { types: ['geocode'] });
    
    createMap();
    createListeners();
}

//Initialize map on Vancouver
function createMap() {
    geocoder.geocode({'address' : "Vancouver BC"}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var mapOptions = {
              center: results[0].geometry.location,
              zoom: 12
            };
            map = new google.maps.Map(document.getElementById("map-canvas"),
                mapOptions);
        }
        else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

//Search bar function
function processSearch(){
    var p = {};
    if(document.getElementById("searchform").elements['user_location_input'].value !== ""){
        geocoder.geocode({'address' : document.getElementById("searchform").elements.item(1).value}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) { 
                p['currentLat'] = results[0].geometry.location.lat();
                p['currentLng'] = results[0].geometry.location.lng();
                p['searchValue'] = document.getElementById("searchform").elements['user_filter_input'].value;
                $('#results').load('index.php/ui/search', p);
            }
            else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
    else{
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                p['currentLat'] = position.coords.latitude;
                p['currentLng'] = position.coords.longitude;
                p['searchValue'] = document.getElementById("searchform").elements['user_filter_input'].value;
                $('#results').load('index.php/ui/search', p);
            }, function() {
                alert:('Error: The Geolocation service failed.');
            });
        } else {
            // Browser doesn't support Geolocation
            alert('Error: Your browser doesn\'t support geolocation.');
        }
    }
}

//Translate address into markers on the map
function findByAddress(address, country){
    var request = {
        address: address,
        componentRestrictions:{country: country}
    };
    geocoder.geocode(request, geoCallback);
}

//Callback function for geocoder
function geoCallback(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      createMarker(results[0].geometry.location);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
}

//Create markers on google map
function createMarker(place) {
  marker = new google.maps.Marker({
    map: map,
    position: place,
    animation: google.maps.Animation.DROP,
    icon: 'assets/img/redmarker.png',
    index: markers.length
  });
  markers.push(marker);
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent("<strong>latitude</strong> = " + place.lat() + "<br\><strong>longitude</strong> = " + place.lng());
    infowindow.open(map, this);
  });
  google.maps.event.addListener(marker, 'mouseover', function() {
    this.setIcon('assets/img/purplemarker.png');
    var div = document.getElementsByClassName('resultbox');
    div[this.index].style.backgroundColor = "#DFDED4";
    div[this.index].scrollIntoView();
  });
  google.maps.event.addListener(marker, 'mouseout', function() {
    this.setIcon('assets/img/redmarker.png');
    var div = document.getElementsByClassName('resultbox');
    div[this.index].style.backgroundColor = "white";
  });
}

// Deletes all markers in the array by removing references to them
function deleteMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

//Automatically zoom to fit all markers
function adjustZoom(){
    var LatLngList = new Array ();
    for (var i in markers){
        LatLngList.push(new google.maps.LatLng(markers[i].position.lat(),markers[i].position.lng()));
    }
    var bounds = new google.maps.LatLngBounds ();
    for (var i = 0, LtLgLen = LatLngList.length; i < LtLgLen; i++) {
      bounds.extend (LatLngList[i]);
    }
    //Prevent map from zooming too close when results are close together
    google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
        if (this.getZoom() > 15) {
          this.setZoom(15);
        }
    });
    map.fitBounds (bounds);
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = new google.maps.LatLng(
          position.coords.latitude, position.coords.longitude);
      autocomplete.setBounds(new google.maps.LatLngBounds(geolocation,
          geolocation));
    });
  }
}

//Return distance (KM) between 2 latlng points
function distance(lat1, lon1, lat2, lon2) {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    //if (unit==="K") { dist = dist * 1.609344; }
    //if (unit==="N") { dist = dist * 0.8684; }
    return dist;
}

//Loads function after window is fully loaded
google.maps.event.addDomListener(window, 'load', initialize);
