<?php 
	include 'cons.php';
	
	/*
echo $_POST['data'];
	exit;
*/
	$sql = "select * from magnum_locator order by city ASC";
	$query = $db->query($sql);

	$result =  array();
	$i = 0;
	while($row = $query->fetch(PDO::FETCH_ASSOC))
	{
		$result[$i] = array(
			'id' => $row['id'],
			'store_id' => $row['store_id'],
			'store_name' => $row['store_name'],
			'lat' => $row['lat'],
			'lng' => $row['lng'],
			'city' => $row['city'],
		);
		$i += 1;
	}

	echo json_encode($result);
 ?>