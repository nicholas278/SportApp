<!DOCTYPE html>
    <head>
        
        <title><?php echo $title ?> - Sports App</title>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" type="text/css" href="<?php echo "$base/$css"?>">

        <style type="text/css">
            html { height: 100% }
            body { height: 100%; margin: 0; padding: 0 }
            #map-canvas { width: 60%; height: 60% }
        </style>
        <script type="text/javascript"
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCEsUxlS6oNJQeozlpm9Kc7J6B4-xJtAys&sensor=false">
        </script>
        <script type="text/javascript">
          function initialize() {
            var mapOptions = {
              center: new google.maps.LatLng(49.2553531, -123.1905086),
              zoom: 12
            };
            var map = new google.maps.Map(document.getElementById("map-canvas"),
                mapOptions);
          }
          google.maps.event.addDomListener(window, 'load', initialize);
        </script>
     </head>
     <body>