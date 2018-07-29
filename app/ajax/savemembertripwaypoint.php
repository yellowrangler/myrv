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
$sequencenumber = $_POST['sequencenumber'];
$address = $_POST['address'];
$city = $_POST['city'];
$state = $_POST['state'];
$estimatedmiles =  $_POST['estimatedmiles'];
$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];
$waypointdate = $_POST['waypointdate'];
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
$dbConn = @mysql_connect($DBhost, $DBuser, $DBpassword);
if (!$dbConn) 
{
	$log = new ErrorLog("logs/");
	$dberr = mysql_error();
	$log->writeLog("DB error: $dberr - Error mysql connect. Unable to save member trip waypoint information.");

	$rv = "";
	exit($rv);
}

if (!mysql_select_db($DBschema, $dbConn)) 
{
	$log = new ErrorLog("logs/");
	$dberr = mysql_error();
	$log->writeLog("DB error: $dberr - Error selecting db Unable to save member trip waypoint information.");

	$rv = "";
	exit($rv);
}

//---------------------------------------------------------------
// update an existing trip. Insert a new one
//---------------------------------------------------------------
if ($waypointid == "")
{
	// insert new trip

	$sql = "INSERT INTO tripwaypointstbl(memberid, tripid, sequencenumber, waypointname, type, 
    address, city, state, estimatedmiles, latitude, longitude, waypointdate, duration, comments, lastupdate) 
	VALUES 
	($memberid,'$tripid','$sequencenumber','$waypointname','$type','$address','$city',
	 '$state','$estimatedmiles','$latitude','$longitude','$waypointdate','$duration','$comments','$enterdate')";
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
}

// print $sql;
// exit();

$sql_result = @mysql_query($sql, $dbConn);
if (!$sql_result)
{
    $log = new ErrorLog("logs/");
    $sqlerr = mysql_error();
    $log->writeLog("SQL error: $sqlerr - Error doing select to db Unable to save member $memberid trip waypoint information.");
    $log->writeLog("SQL: $sql");

    $status = -100;
    $msgtext = "System Error: $sqlerr";
}


//
// close db connection
//
mysql_close($dbConn);

//
// pass back info
//
exit($msgtext);

?>
