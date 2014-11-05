<?php
ob_start();
$host = "localhost";
$user = "root";
$pass = "root";

try
{
	$db = new PDO("mysql:host=$host;dbname=magnum",$user,$pass);
	// echo "Database Connected";
}
catch(PDOException $e)
{
	echo $e->getMessage();
}
