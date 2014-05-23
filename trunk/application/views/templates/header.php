<!DOCTYPE html>
    <head>
        
        <title><?php echo $title ?> - Sports App</title>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/style.css">
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
        <script type="text/javascript" src="<?php echo base_url(); ?>assets/js/results.js"></script>
        <?php if($title == "Home"): ?>
            <script type="text/javascript"
              src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCEsUxlS6oNJQeozlpm9Kc7J6B4-xJtAys&sensor=false">
            </script>
            <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?libraries=places&sensor=false"></script>
            <script type="text/javascript" src="<?php echo base_url(); ?>assets/js/googlemapapi.js"></script>  
        <?php endif ?>
     </head>
     <body class="color3">
         <div id="top" class="color1">
		<div id="topwrapper">
			<div id="logo">
			</div>
			<div id="topinputbox">
				<div id="topinputcontainer">
					<form name="input"  action="javascript:void(0);" id="searchform">
							<input type="text" name="user_location_input" placeholder="&nbsp;Sports, Locations, Names..." id="searchinput"><!--
							--><input type="submit" value="Search" id="searchsubmit">			        
					</form>
				</div>
			</div>
			<div id="buttonbox">
				<button type="button" onclick="window.location='<?php echo base_url(); ?>index.php'" class="color1">Home</button>
                                <button type="button" onclick="window.location='<?php echo base_url(); ?>index.php/view/about'" class="color1">About</button>
                                <button type="button" onclick="window.location='<?php echo base_url(); ?>index.php/view/contribute'" class="color1">Contribute</button>
                                <button type="button" onclick="window.location='<?php echo base_url(); ?>index.php/view/contact'" class="color1">Contact Us</button>
			</div>
		</div>
        </div>