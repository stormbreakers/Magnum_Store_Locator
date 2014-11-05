<?php

	$hostname = "localhost";
	$username = "root";
	$password = "root";
	$database = "magnum";

	if(mysql_connect($hostname, $username, $password)) 
	{
		 if(mysql_select_db($database)) {
		 }
		 else {
			 mysql_error();
		 }
	 }
	 else
	 {
		 mysql_error();
	 }

	 	$query = 'SELECT * from `magnum_locator` where city = ""';
	 	$results = mysql_query($query) or die(mysql_error());
	 	while($row = mysql_fetch_assoc($results)){
	 		$lng = $row['lng'];
	 		$lat = $row['lat'];
			$id = $row['id'];
		   	 $json = file_get_contents("https://maps.googleapis.com/maps/api/geocode/json?latlng={$lat},{$lng}&key=AIzaSyDlZXvUhdROlhsVLzYdVsdf-6ayluZYX64&result_type=administrative_area_level_2");
	 
		   	 $obj = json_decode($json);
	 
		   	 $city = $obj->results[0]->address_components[0]->short_name;
			 $sql = 'UPDATE magnum_locator
			         SET city="'.$city.'"
			         WHERE id='.$id;

			$retval = mysql_query( $sql );
			
	 	
	 	};
	 


	 
	 

