<?php  

$fullAddress = $_GET['fullAddress'];

$json = file_get_contents("https://maps.googleapis.com/maps/api/geocode/json?address={$fullAddress}&key=AIzaSyDlZXvUhdROlhsVLzYdVsdf-6ayluZYX64");

$obj = json_decode($json);

$lat = $obj->results[0]->geometry->location->lat;
$lng = $obj->results[0]->geometry->location->lng;

$result = json_encode(array('lat' => $lat, 'lng' => $lng));
echo $result;



