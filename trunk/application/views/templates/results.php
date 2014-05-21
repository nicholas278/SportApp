<?php if($sortByDist == TRUE): ?>
    <script>
        sortedSports = sortSports(<?php echo json_encode($sports); ?>, <?php echo $currentLat; ?>, <?php echo $currentLng; ?> );
        displayResults(sortedSports);
    </script>
<?php else: ?>
    <script> 
        displayResults(<?php echo json_encode($sports); ?>);
    </script> 
<?php endif; 

        