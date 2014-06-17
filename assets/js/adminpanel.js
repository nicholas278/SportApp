var geocoder;

//Create listeners for the entire website
function createListeners(){
    geocoder = new google.maps.Geocoder();
    $(document).ready(function(){
        //Create listeners for the top menu
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
        //p['postal_code'] = document.getElementById("db_postalcode").value;
        addEntry(p);
    });
}

//Get lat lng from google map api and save it to DB
function addEntry(location){
    var request = {
        address: location['address'],
        componentRestrictions:{country: location['country']}
    };
    geocoder.geocode(request, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          var address = results[0].address_components;
          location['postal_code'] = address[address.length - 1].long_name;
          location['latitude'] = results[0].geometry.location.lat();
          location['longitude'] = results[0].geometry.location.lng();
          $('#lefttable').load('admin/createDBItem', location); 
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

//Loads function after window is fully loaded
google.maps.event.addDomListener(window, 'load', createListeners);
//window.onload = createListeners;