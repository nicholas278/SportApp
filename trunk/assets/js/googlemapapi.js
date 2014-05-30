var map, geocoder, infowindow; //Google Objects
var markers;

function initialize() {
    markers = [];
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
            p['filterType'] = "sport";
            p['filterValue'] = this.id;
            $('#results').load('index.php/add_filter', p); 
            return false;
        });
        //Check what area is clicked and center map to that area
        $('.area').click( function() {
            deleteMarkers();
            var p = {};
            p['filterType'] = "city";
            p['filterValue'] = this.id;
            if(this.id === "Current Location"){
                if(navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        p['currentLat'] = position.coords.latitude;
                        p['currentLng'] = position.coords.longitude;
                        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        createMarker(pos);
                        $('#results').load('index.php/lookup', p);
                    }, function() {
                        alert:('Error: The Geolocation service failed.');
                    });
                } else {
                    // Browser doesn't support Geolocation
                    alert('Error: Your browser doesn\'t support geolocation.');
                }
            }
            else{
                $('#results').load('index.php/add_filter', p); 
            }
            return false;
        });
        //Check for remove filter
        $("#typebox").on("click", "a", function() {
            deleteMarkers();
            var p = {};
            p['removeType'] = this.id;
            $('#results').load('index.php/remove_filter', p); 
            return false;
        });
        //Check location
        $('#searchsubmit').click( function() {
            deleteMarkers();
            geocoder.geocode({'address' : document.getElementById("searchform").elements.item(0).value}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    var p = {};
                    p['sortByDist'] = true;
                    p['currentLat'] = results[0].geometry.location.lat();
                    p['currentLng'] = results[0].geometry.location.lng();
                    $('#results').load('index.php/lookup', p);
                }
                else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        });
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
function findByAddress(address, country){
    var request = {
        address: address,
        componentRestrictions:{country: country}
    };
    geocoder.geocode(request, callback);
}


//Callback function for geocoder
function callback(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      createMarker(results[0].geometry.location);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
}

function createMarker(place) {
  marker = new google.maps.Marker({
    map: map,
    position: place,
    animation: google.maps.Animation.DROP
  });
  markers.push(marker);
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.formatted_address);
    infowindow.open(map, this);
  });
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
    //Prevent map from zooming too close when results are close together
    google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
        if (this.getZoom() > 15) {
          this.setZoom(15);
        }
    });
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
