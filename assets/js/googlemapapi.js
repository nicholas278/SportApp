var map, geocoder, infowindow; //Google Objects
var markers, arrayLength;

function initialize() {
    markers = [];
    loaded = false;
    geocoder = new google.maps.Geocoder();
    infowindow = new google.maps.InfoWindow();
    
    //Initialize map on Vancouver
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

    $(document).ready(function(){
        //Check the state of list on left panel and display the right results
        $('.sportslist').click( function() {
            deleteMarkers();
            var p = {};
            p['type'] = this.id;
            $('#results').load('index.php/pages/lookup', p); 
            return false;
        });
        //Check what area is clicked and center map to that area
        $('.area').click( function() {
            geocoder.geocode({'address' : this.id}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                }
                else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
            return false;
        });
        //Check location
        $('#locationSubmit').click( function() {
            deleteMarkers();
            geocoder.geocode({'address' : document.getElementById("locationForm").elements.item(0).value}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    var p = {};
                    p['sortByDist'] = true;
                    p['currentLat'] = results[0].geometry.location.lat();
                    p['currentLng'] = results[0].geometry.location.lng();
                    $('#results').load('index.php/pages/lookup', p);
                }
                else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        });
    });
    
}

//Callback function for geocoder
function callback(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      //map.setCenter(results[0].geometry.location);
      createMarker(results[0]);;
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  marker = new google.maps.Marker({
    map: map,
    position: placeLoc,
    animation: google.maps.Animation.DROP
  });
  markers.push(marker);
  if(markers.length === arrayLength){
    adjustZoom();
  }
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.formatted_address);
    infowindow.open(map, this);
  });
}

// Deletes all markers in the array by removing references to them
function deleteMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

//Translate address into markers on the map
function findByAddress(address, length){
    arrayLength = length; //created a global counter to only run adjustZoom once in every request
    var request = {
        address: address
    };
    geocoder.geocode(request, callback);
}

function adjustZoom(){
    var LatLngList = new Array ();
    for (var i in markers){
        LatLngList.push(new google.maps.LatLng(markers[i].position.lat(),markers[i].position.lng()));
    }
    var bounds = new google.maps.LatLngBounds ();
    for (var i = 0, LtLgLen = LatLngList.length; i < LtLgLen; i++) {
      bounds.extend (LatLngList[i]);
    }
    map.fitBounds (bounds);
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


google.maps.event.addDomListener(window, 'load', initialize);
