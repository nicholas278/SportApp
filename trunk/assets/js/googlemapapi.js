var map;
var markers;
var infowindow;

function initialize() {
    markers = [];
    
    var mapOptions = {
      center: new google.maps.LatLng(49.2553531, -123.1400000),
      zoom: 11
    };
    map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
    geocoder = new google.maps.Geocoder()
    infowindow = new google.maps.InfoWindow();

    //Check the state of list on left panel and display the right results
    $(document).ready(function(){
        $('a').click( function() {
            deleteMarkers();
            var p = {};
            p['type'] = this.id;
            $('#results').load('index.php/pages/lookup', p); 
            return false;
        });
    });
}

//Callback function for geocoder
function callback(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      createMarker(results[0]);;
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  marker = new google.maps.Marker({
    map: map,
    position: placeLoc
  });
  markers.push(marker);
  //alert("add "+markers.length);

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.formatted_address);
    infowindow.open(map, this);
  });
}

// Deletes all markers in the array by removing references to them
function deleteMarkers() {
  //alert("delete " + markers.length);
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

/*
var loading_interval = setInterval(function(){
    if(result_string.length !== 0){
        var ol=document.createElement("ol");
        for(var result in result_string){
            var li=document.createElement("li");
            var node=document.createTextNode(result_string[result]);
            li.appendChild(node);
            ol.appendChild(li);
        }
        var element=document.getElementById("results");
        element.appendChild(ol);
        clearInterval(loading_interval);
    }
},0);
*/

//Translate address into markers on the map
function findByAddress(address){
    var request = {
        address: address
    };
    geocoder.geocode(request, callback);
}

google.maps.event.addDomListener(window, 'load', initialize);
