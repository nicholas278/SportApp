//Create listeners for the entire website
function createListeners(){
    $(document).ready(function(){
        //Create listener for the top menu
        createListenerTopMenu();
        //Create listeners for the filters
        createListenersFilter();  
        //Create listener for the result highlight
        createListenerResult();
    });
}

//Create listeners for the search bar and the menu bar
function createListenerTopMenu(){
    //Check menu bar for page change
    $('#buttonbox button').click(function(){
        var shost = window.location.origin;
        var page = this.id;

        $('#contentwrap').load(shost+'/SportApp/index.php/view/'+page, function(){
            document.title = page.charAt(0).toUpperCase() + page.slice(1) + " - Sports App";
            //Initialize the map and listeners
            if(page === 'home'){
                initializeHome();
            }
        });
    });
    
    //Check search bar for queries
    $("#searchsubmit").click(function() {
        deleteMarkers();
        var shost = window.location.origin;
        if(document.title !== "Home - Sports App"){
            document.title = "Home - Sports App";
            //load home page
            $('#contentwrap').load(shost+'/sportapp/index.php/view/home', function(){
                initializeHome();
                processSearch();
            });
        }
        else{
            processSearch();
        }
    });
}

//Create listeners for the left menu bar and the filter controls
function createListenersFilter(){
    //Check what sport is clicked
    $('.sportslist').on("click", function() {
        deleteMarkers();
        var p = {};
        p['filterType'] = "sport";
        p['filterValue'] = this.id;
        $('#results').load('index.php/ui/add_filter', p); 
        return false;
    });
    //Check what area is clicked
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
                    $('#results').load('index.php/ui/current_location', p);
                }, function() {
                    alert:('Error: The Geolocation service failed.');
                });
            } else {
                // Browser doesn't support Geolocation
                alert('Error: Your browser doesn\'t support geolocation.');
            }
        }
        else{
            $('#results').load('index.php/ui/add_filter', p); 
        }
        return false;
    });
    //Check for remove filter
    $("#typebox").on("click", "a", function() {
        deleteMarkers();
        var p = {};
        p['removeType'] = this.id;
        $('#results').load('index.php/ui/remove_filter', p); 
        return false;
    });
}

function createListenerResult(){
    $("#results").on("mouseover", ".resultbox", function(){
        markers[this.id].setIcon('assets/img/purplemarker.png');
    });
    $("#results").on("mouseout", ".resultbox", function(){
        markers[this.id].setIcon('assets/img/redmarker.png');
    });
}

//Setup homepage mechanics
function initializeHome(){
    createMap(); 
    createListenersFilter();
}