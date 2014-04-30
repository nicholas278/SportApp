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
    
    var request = {
        location: new google.maps.LatLng(49.2553531, -123.1905086),
        radius: '10000',
        //types: ['gym']
        name:  'steve nash fitness'
    };
    
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
      result_string.push(place.name);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}


google.maps.event.addDomListener(window, 'load', initialize);

//google.maps.event.addDomListener(window,'load', function(){document.getElementById("banner").innerHTML=result_string;});
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
