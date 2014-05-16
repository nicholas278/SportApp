<?php if($sortByDist == TRUE): ?>
    <script>
        sortedSports = sortSports(<?php echo json_encode($sports); ?>, <?php echo $currentLat; ?>, <?php echo $currentLng; ?> );
        for(var i in sortedSports){
            findByAddress(sortedSports[i].sports["address"]);
            createNewItem(sortedSports[i].sports["name"], sortedSports[i].sports["address"], sortedSports[i].dist);
        }
    </script>
<?php else: 
    foreach ($sports as $sp): ?>
        <script> 
            findByAddress(<?php echo json_encode($sp["address"]); ?> ); 
            createNewItem(<?php echo json_encode($sp["name"]); ?>, <?php echo json_encode($sp["address"]); ?> );
        </script> 
    <?php endforeach;
endif; 

        