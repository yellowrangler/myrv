<?php

include_once ('../class/class.Log.php');
include_once ('../class/class.ErrorLog.php');
include_once ('../class/class.AccessLog.php');

//
// post input
//
$memberid = $_POST['memberid'];
$tripid = $_POST['tripid'];
$waypointid = $_POST['waypointid'];
$type = "";
$waypointname = $_POST['waypointname'];
$waypointlocation = $_POST['waypointlocation'];
$sequencenumber = $_POST['sequencenumber'];
$address = $_POST['address'];
$city = $_POST['city'];
$state = $_POST['state'];
$estimatedmiles =  $_POST['estimatedmiles'];
$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];

$waypointdate = "";
if (!empty($_POST['waypointdate'])) 
{
	$waypointdate = date("Y-m-d", strtotime($_POST['waypointdate']) );
}

$duration = $_POST['duration'];
$comments = $_POST['comments'];

//
// get date time for this transaction
//
$datetime = date("Y-m-d H:i:s");

// print_r($_POST);
// die();

// set variables
$enterdate = $datetime;
$msgtext = "ok";

//
// messaging
//
$returnArrayLog = new AccessLog("logs/");
// $returnArrayLog->writeLog("Member List request started" );

//------------------------------------------------------
// get admin user info
//------------------------------------------------------
// open connection to host
$DBhost = "localhost";
$DBschema = "myrv";
$DBuser = "tarryc";
$DBpassword = "tarryc";

//
// connect to db
//
$mysqli = new mysqli($DBhost, $DBuser, $DBpassword, $DBschema);
if ($mysqli->connect_errno) 
{
	$log = new ErrorLog("logs/");
	$dberr = mysqli_connect_error();
	$log->writeLog("DB error: $dberr - Error selecting db Unable to save member trip waypoint information.");

	$rv = "";
	exit($rv);
}

//---------------------------------------------------------------
// update an existing trip. Insert a new one
//---------------------------------------------------------------
$sqlFunction = "";
if ($waypointid == "")
{
	// insert new trip

	$sql = "INSERT INTO tripwaypointstbl(memberid, tripid, sequencenumber, waypointname, waypointlocation, type, 
    address, city, state, estimatedmiles, latitude, longitude, waypointdate, duration, comments, lastupdate) 
	VALUES 
	($memberid,'$tripid','$sequencenumber','$waypointname', '$waypointlocation', '$type','$address','$city',
	 '$state','$estimatedmiles','$latitude','$longitude','$waypointdate','$duration','$comments','$enterdate')";

	 $sqlFunction = "insert";
}
else
{
	// update existing trip

	$sql = "UPDATE tripwaypointstbl SET 
	    id=$waypointid,
		memberid=$memberid,
		tripid=$tripid,
		sequencenumber=$sequencenumber,
		waypointname='$waypointname',
		waypointlocation='$waypointlocation',
		type='$type',
		address='$address',
		city='$city',
		state='$state',
		estimatedmiles='$estimatedmiles',
		latitude='$latitude',
		longitude='$longitude',
		waypointdate='$waypointdate',
		duration='$duration',
		comments='$comments',
	    lastupdate = '$enterdate' 
	WHERE memberid = $memberid AND tripid = $tripid AND id = $waypointid";

	$sqlFunction = "update";
}

// print $sql;
// exit();

$result = $mysqli->query($sql);
if (!$result) 
{
    $log = new ErrorLog("logs/");
	$sqlerr = $mysqli->errno();
    $log->writeLog("SQL error: $sqlerr - Error doing select to db Unable to save member $memberid trip waypoint information.");
    $log->writeLog("SQL: $sql");

    $status = -100;
    $msgtext = "System Error: $sqlerr";
}

//
// get id if insert
//
if ($sqlFunction == "insert")
{
	$waypointid = $mysqli->insert_id;
}


//
// close db connection
//
$mysqli->close();

//
// pass back info
//
$msg["msgtext"] = $msgtext;
$msg["waypointid"] = $waypointid;
$msg["waypointname"] = $waypointname;

exit(json_encode($msg));

?>
