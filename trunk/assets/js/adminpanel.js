//Create listeners for the entire website
function createListeners(){
    $(document).ready(function(){
        //Create listeners for the top menu
        createListenerSubmit();
    });
}

function createListenerSubmit(){
    $('#dbSubmit').click(function(){
        var p = [];
        p['sport'] = "*";
        p['name'] = "*";
        p['address'] = "*";
        p['city'] = "*";
        p['province'] = "*";
        p['contry'] = "*";
        p['postal_code'] = "*";
        $('#lefttable').load('index.php/admin/createDBItem', p); 
    });
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

window.onload = createListeners;