    <script> 
        <?php if(isset($reloadMap)): ?>
            displayResults(<?php echo json_encode($filtersList); ?>, <?php echo json_encode($sports); ?>, <?php echo json_encode($resultList); ?>, <?php echo $currentPage; ?>, <?php echo $maxPage; ?>, false );
        <?php else: ?>
            displayResults(<?php echo json_encode($filtersList); ?>, <?php echo json_encode($sports); ?>, <?php echo json_encode($resultList); ?>, <?php echo $currentPage; ?>, <?php echo $maxPage; ?>, true );
        <?php endif; ?>
    </script>

        