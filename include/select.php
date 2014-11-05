<?php
	include 'cons.php'; 
	$sql = "select city from magnum_locator group by city";
	$query = $db->query($sql);

	$result =  array();
	$i = 0;
	while($row = $query->fetch(PDO::FETCH_ASSOC))
	{
		$result[$i] = $row['city'];
		$i += 1;
	}

	echo json_encode($result);
 ?>