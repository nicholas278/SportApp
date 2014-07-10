//Create listeners for the entire website
function createListeners(){
    $(document).ready(function(){
        //Create listeners for the top menu
        createListenerHeader();
        //Create listeners for home page
        createListenerHome();
        //Create listener for footer menu
        createListenerFooter();
    });
}

//Create listeners for the search bar and the menu bar
function createListenerHeader(){
    //Check menu bar for page change
    $('#buttonbox button').click(function(){
        var page = this.id;

        $('#contentwrap').load(base_url +'index.php/view/'+page, function(){
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
        if(document.title !== "Home - Sports App"){
            document.title = "Home - Sports App";
            //load home page
            $('#contentwrap').load(base_url+'index.php/view/home', function(){
                initializeHome();
                processSearch();
            });
        }
        else{
            processSearch();
        }
    });
}

function createListenerFooter(){
    //Check menu bar for page change
    $('#footerchild a').click(function(){
        var page = this.id;

        $('#contentwrap').load(base_url+'index.php/view/'+page, function(){
            document.title = page.charAt(0).toUpperCase() + page.slice(1) + " - Sports App";
            //Initialize the map and listeners
            if(page === 'home'){
                initializeHome();
            }
        });
    });
}

//Create listeners for the left menu bar and the filter controls
function createListenerFilter(){
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

function createListenerSort(){
    $("#sortbox a").click(function(){
        deleteMarkers();
        var p = {};
        p['sortBy'] = this.id;
        $('#results').load('index.php/ui/sort_list', p);
    });
}

function createListenerResult(){
    $("#results").on("mouseover", ".resultbox", function(){
        document.getElementById(this.id).style.backgroundColor = "#DFDED4";
        markers[this.id].setIcon('assets/img/purplemarker.png');
    });
    $("#results").on("mouseout", ".resultbox", function(){
        document.getElementById(this.id).style.backgroundColor = "transparent";
        markers[this.id].setIcon('assets/img/redmarker.png');
    });
}

function createListenerPageChange(){
    $("#firstpage").on("click", "a", function(){
        deleteMarkers();
        $('#results').load('index.php/ui/first_page'); 
    });
    $("#previouspage").on("click", "a", function(){
        deleteMarkers();
        $('#results').load('index.php/ui/previous_page'); 
    });
    $("#nextpage").on("click", "a", function(){
        deleteMarkers();
        $('#results').load('index.php/ui/next_page'); 
    });
    $("#lastpage").on("click", "a", function(){
        deleteMarkers();
        $('#results').load('index.php/ui/last_page'); 
    });
}

//Setup homepage mechanics
function initializeHome(){
    createMap(); 
    createListenerHome();
}

function createListenerHome(){
    //Create listeners for the filters
    createListenerFilter();
    //Create listener for sorting
    createListenerSort();
    //Create listener for the result highlight
    createListenerResult();
    //Create listener for page change
    createListenerPageChange();
}