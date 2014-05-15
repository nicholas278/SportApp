<?php for ($i = 0; $i < sizeof($sports); $i++): ?>
        <script> 
            findByAddress(<?php echo json_encode($sports[$i]["address"]); ?> ); 
            createNewItem(<?php echo $i; ?>, <?php echo json_encode($sports[$i]["name"]); ?>, <?php echo json_encode($sports[$i]["address"]); ?> );
            //distance(<?php echo json_encode($sports[$i]["latitude"]); ?>, <?php echo json_encode($sports[$i]["longitude"]); ?>, 49.158390, -123.174889)
        </script>
        
<?php endfor ?>

        