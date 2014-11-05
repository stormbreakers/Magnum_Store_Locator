<?php
	
$json = file_get_contents("https://maps.googleapis.com/maps/api/geocode/json?latlng={$lat},{$lng}&key=AIzaSyDlZXvUhdROlhsVLzYdVsdf-6ayluZYX64&result_type=administrative_area_level_2");

$obj = json_decode($json);

$city = $obj->results[0]->address_components[0]->short_name;

echo json_encode($city);

