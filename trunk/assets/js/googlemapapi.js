var map;
var infowindow;
var result_string=[];

function initialize() {
    
    var mapOptions = {
      center: new google.maps.LatLng(49.2553531, -123.1400000),
      zoom: 11
    };
    map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
    geocoder = new google.maps.Geocoder()
    infowindow = new google.maps.InfoWindow();
}

function callback(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      createMarker(results[0]);
      result_string.push(results[0].formatted_address);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: placeLoc
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.formatted_address);
    infowindow.open(map, this);
  });
}

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

function findByType(sportslist, type){
    for(var sports in sportslist){
        if(sportslist[sports].type === type){
            findByAddress(sportslist[sports].address);
        }
    }
}

function findByAddress(address){
    var request = {
        address: address
    };
    geocoder.geocode(request, callback);
}

google.maps.event.addDomListener(window, 'load', initialize);
