var geocoder, service, map, infowindow, markers;

//Create listeners for the entire website
function initialize(){
    geocoder = new google.maps.Geocoder();
    infowindow = new google.maps.InfoWindow();
    geocoder.geocode({'address' : "Vancouver BC"}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var mapOptions = {
              center: results[0].geometry.location,
              zoom: 12
            };
            map = new google.maps.Map(document.getElementById("lefttable"),
                mapOptions);    
            service = new google.maps.places.PlacesService(map);
        }
        else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
    markers=[];
    
    
    $(document).ready(function(){
        createListenerSearch();
        createListenerSubmit();
    });
}

function createListenerSubmit(){
    $('#dbSubmit').click(function(){
        var p = {};
        p['sport'] = document.getElementById("dbsportinput").value;
        p['name'] = document.getElementById("db_name").value;
        p['address'] = document.getElementById("db_address").value;
        p['city'] = document.getElementById("db_city").value;
        p['province'] = document.getElementById("db_province").value;
        p['country'] = document.getElementById("db_country").value;
        p['postal_code'] = document.getElementById("db_postalcode").value;
        p['latitude'] = document.getElementById("db_latitude").value;
        p['longitude'] = document.getElementById("db_longitude").value;
        addEntry(p);
    });
}

function createListenerSearch(){
    $('#dbSearch').click(function(){
        deleteMarkers();
        searchMap(document.getElementById("db_namesearch").value);
    });
}

function searchMap(location){
    
    var placerequest = {
        query: location,
        location: new google.maps.LatLng(49.2327149,-123.122433), //Vancouver BC Coords
        radius: 50
    };
    service.textSearch(placerequest, function(results, status){
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
            adjustZoom();
        } else {
            alert('Places was not successful for the following reason: ' + status);
        }
    });
}

//Get lat lng from google map api and save it to DB
function manualSearch(location){   
    var geocoderequest = {
        address: location['address']+", "+location['city']+" "+location['province'],
        componentRestrictions:{country: location['country']}
    };
    geocoder.geocode(geocoderequest, function(results, status) {       
        if(status === google.maps.GeocoderStatus.OK) {
            if(results[0].partial_match === true){
                alert("Cannot pin point location, please double check address");
            }
            else{
                var address = results[0].address_components;
                location['postal_code'] = address[address.length - 1].long_name;
                location['latitude'] = results[0].geometry.location.lat();
                location['longitude'] = results[0].geometry.location.lng();
            }
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function addEntry(location){
    $.post('admin/createDBItem', location, function(data, status){
        if(status === "success"){
            alert("You Have Successfully Added This Record!");
        }
        else{
            alert("Data: " + data + "\nStatus: " + status);
        }
    });
}

//Create markers on google map
function createMarker(place) {
  var location = place.geometry.location;
  marker = new google.maps.Marker({
    map: map,
    position: location,
    animation: google.maps.Animation.DROP,
    index: markers.length
  });
  markers.push(marker);
  google.maps.event.addListener(marker, 'click', function() {    
    var request = {
        placeId: place.place_id
    };
    infowindow.setContent("<strong>Name</strong> = " + place.name + "<br\><strong>Address</strong> = " + place.formatted_address + "<br\>" + "<strong>latitude</strong> = " + location.lat() + "<br\><strong>longitude</strong> = " + location.lng());
    infowindow.open(map, this);
    service.getDetails(request, function(place, status){
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearForm();
            document.getElementById("db_name").value = place.name;
            for(var i=0; i < place.address_components.length; i++){
                switch(place.address_components[i].types[0]){
                    case "street_number":
                        var street_number = place.address_components[i].long_name;
                        break;
                    case "route":
                        if(street_number){
                            document.getElementById("db_address").value=street_number + " " + place.address_components[i].long_name;
                        }
                        else{
                            document.getElementById("db_address").value=place.address_components[i].long_name;
                        }
                        break;
                    case "locality":
                        document.getElementById("db_city").value=place.address_components[i].long_name;
                        break;
                    case "administrative_area_level_1":
                        document.getElementById("db_province").value=place.address_components[i].long_name;
                        break;
                    case "country":
                        document.getElementById("db_country").value=place.address_components[i].long_name;
                        break;
                    case "postal_code":
                        document.getElementById("db_postalcode").value=place.address_components[i].long_name;
                        break;
                }
            }
            document.getElementById("db_latitude").value = location.lat();
            document.getElementById("db_longitude").value = location.lng();
        }
    });
  });
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

// Deletes all markers in the array by removing references to them
function deleteMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

function clearForm(){
    document.getElementById("db_name").value="";
    document.getElementById("db_address").value="";
    document.getElementById("db_city").value="";
    document.getElementById("db_province").value="";
    document.getElementById("db_country").value="";
    document.getElementById("db_postalcode").value=""; 
    document.getElementById("db_latitude").value=""; 
    document.getElementById("db_longitude").value=""; 
}

//Loads function after window is fully loaded
google.maps.event.addDomListener(window, 'load', initialize);
//window.onload = createListeners;
