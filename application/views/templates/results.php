<?php for ($i = 0; $i < sizeof($sports); $i++): ?>
        <script> 
            findByAddress(<?php echo json_encode($sports[$i]["address"]); ?> ); 
            createNewItem(<?php echo $i; ?>, <?php echo json_encode($sports[$i]["name"]); ?>, <?php echo json_encode($sports[$i]["address"]); ?> );
        </script>
        
<?php endfor ?>

        