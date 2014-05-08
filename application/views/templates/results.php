<script type="text/javascript" src="assets/js/googlemapapi.js"></script>

<?php foreach ($sports as $sports_item): ?>
        <h2><?php echo $sports_item['name'] ?></h2>
        <div id="main">
            <?php echo $sports_item['address'] ?>
        </div>
        <script> 
            findByAddress(<?php echo json_encode($sports_item["address"]); ?>); 
        </script>
<?php endforeach ?>
